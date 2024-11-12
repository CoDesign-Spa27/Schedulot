import {z} from "zod";
import admin from 'firebase-admin'
import { configDotenv } from "dotenv";
import bcrypt from 'bcryptjs';
import authenticateUser from "../middleware/authMiddleware.js";
import {Firestore} from 'firebase-admin/firestore'
configDotenv();
export const adminConfig = admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_ADMIN_API),
  });
  
 export const db = adminConfig.firestore();
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(1, "Name is required"),
    user_type: z.enum(["instructor", "student"])
  });

  
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password is required" })
  });

export const registerUser=async(req,res)=>{
    try{
        const { email,password,name,user_type } = registerSchema.parse(req.body);


        const userSnapShot = await db.collection('users').where('email', '==', email).get();


        if (!userSnapShot.empty) {
            return res.status(400).json({ error: 'User already exists' });
          }

           const userRecord = await adminConfig.auth().createUser({
            email,
            password,
            displayName: name,
        });

        await adminConfig.auth().setCustomUserClaims(userRecord.uid, { user_type });

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.collection('users').doc(userRecord.uid).set({
            email,
            name,
            user_type,
            hashedPassword,
            created_at: Firestore.FieldValue.serverTimestamp(),
            updated_at: Firestore.FieldValue.serverTimestamp()
        });

        return res.status(201).json({ message: 'User created successfully', user: {uid:userRecord.uid, email, name, user_type } });
    }catch(error){
        if(error instanceof z.ZodError){
            return res.status(400).json({ error: error.errors });
        }
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}

export const loginUser=async(req,res)=>{

    try {
        const {email,password} =loginSchema.parse(req.body);

        const userCredential=await adminConfig.auth().getUserByEmail(email);
        const userDoc=await db.collection('users').doc(userCredential.uid).get();
        const userData=userDoc.data();

        if (!userData) {
            return res.status(404).json({ error: 'User data not found in Firestore' });
          }

            const isPasswordValid = await bcrypt.compare(password, userData.hashedPassword);
            if (!isPasswordValid) {
              return res.status(401).json({ error: 'Invalid email or password' });
            }
            const token = await adminConfig.auth().createCustomToken(userCredential.uid,{
                user_type: userData.user_type,
            });

            return res.json({ token, 
                 user: {
                uid: userCredential.uid,
                email: userCredential.email,
                name: userData.name,
                user_type: userData.user_type
              } });

    }catch(error){
        if(error instanceof z.ZodError){
            return res.status(400).json({ error: error.errors });
        }
        console.error(error);
        res.status(500).json({ error: 'Failed to login user' });
    }
    
}


export const me = [authenticateUser, async (req, res) => {
  try {
    const user = req.user; 
    res.json({
      message: 'User profile fetched successfully',
      user:{
        uid: user.uid,
        email: user.email,
        name: user.name,
        user_type: user.user_type
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
}];
