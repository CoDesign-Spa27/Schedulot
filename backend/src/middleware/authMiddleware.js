import { jwtDecode } from 'jwt-decode';
import { configDotenv } from "dotenv";
configDotenv();
import { db } from '../controller/authController.js';

const authenticateUser = async (req, res, next) => {
 
    try {
      
      const token = req.headers.authorization?.split("Bearer ")[1];
      
      
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
  
      
  const decodedToken =jwtDecode(token);
  const userDoc = await db.collection('users').doc(decodedToken.uid).get();
  if (!userDoc.exists) {
    return res.status(401).json({ error: 'User data not found in Firestore' });
  }
  
  req.user = { uid: decodedToken.uid, ...userDoc.data() };
   
      next();
    } catch (error) {
      console.error('Authentication error:', error);
  
      if (error.code === 'auth/id-token-expired') {
        return res.status(401).json({ error: 'Token expired. Please log in again.' });
      } else if (error.code === 'auth/argument-error') {
        return res.status(400).json({ error: 'Invalid token format.' });
      }
  
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  export default authenticateUser;