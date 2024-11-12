import { z } from "zod";
import { adminConfig } from "../controller/authController.js";
import { db } from "../controller/authController.js";
import authenticateUser from "../middleware/authMiddleware.js";
import { Firestore } from "firebase-admin/firestore";

const bookingSchema = z.object({
  availability_id: z.string(),
});
export const getInstructors = [
  authenticateUser,
  async (req, res) => {
    try {
      const snapshot = await db
        .collection("users")
        .where("user_type", "==", "instructor")
        .get();
      const instructors = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.json(instructors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

export const getSlots = [
  authenticateUser,
  async (req, res) => {
    try {
      const { instructorId } = req.query;

      if (!instructorId) {
        return res.status(400).json({ message: "Instructor ID is required" });
      }

      let query = db
        .collection("availability")
        .where("status", "==", "available")
        .where("instructor_id", "==", instructorId);

      const snapshot = await query.orderBy("start_time").get();
      const slots = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.json(slots);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

export const bookSlot = [
  authenticateUser,
  async (req, res) => {
    try {
      const validation = bookingSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: validation.error });
      }
      const { availability_id } = validation.data;
      const studentId = req.user.uid;

      await db.runTransaction(async (transaction) => {
        const availabilityRef = db
          .collection("availability")
          .doc(availability_id);

        const slotDoc = await transaction.get(availabilityRef);
        const startTime= slotDoc.data().start_time;
        const endTime= slotDoc.data().end_time;

        if (!slotDoc.exists) {
       return res.status(404).json({ message: "Slot not found" });
        }
        if (slotDoc.data().status !== "available") {
       return res.status(400).json({ message: "Slot not available" });
        }

        const bookingRef =db.collection('bookings').doc();
        transaction.set(bookingRef,{
          studentId:studentId,
          availability_id:availability_id,
          start_time:startTime,
          end_time:endTime,
          booking_date:Firestore.FieldValue.serverTimestamp(),
          status:"confirmed",
          created_at:Firestore.FieldValue.serverTimestamp(),
          updated_at:Firestore.FieldValue.serverTimestamp()

        })

        transaction.update(availabilityRef,{
          status:'booked',
          updated_at:Firestore.FieldValue.serverTimestamp(),
        })
      });

      res.status(201).json({message:"Booking confirmed successfully"})
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];


export const getBookings=[authenticateUser, async(req,res)=>{
  const userId=req.user.uid;
  const userType=req.user.user_type;
  const bookingRef=db.collection('bookings');

  let query=bookingRef;
 
  if(userType==='student'){
    query=query.where('studentId','==',userId);
  }else if(userType==='instructor'){
    query=query.where('instructorId','==',userId);
  }
  

  const snapshot = await query.orderBy('booking_date',"desc").get();
  const bookings = snapshot.docs.map(doc=>({
    id:doc.id,
    ...doc.data()
  }))
  res.json(bookings)
}]