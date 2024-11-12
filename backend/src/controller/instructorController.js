import { z } from 'zod'
import {adminConfig} from '../controller/authController.js'
import { db } from '../controller/authController.js'
import authenticateUser from '../middleware/authMiddleware.js'
import {Firestore} from 'firebase-admin/firestore'

const timeSlotSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), 
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
})
const checkSlotConflict = async(instructorId,date,startTime,endTime)=>{
    const availabilityRef = db.collection('availability');
    const conflicts =await availabilityRef.where('instructor_id','==',instructorId).where('date','==',date).where('status','==','available').get();

    return conflicts.docs.some(doc=>{
        const slot = doc.data();
        return (
            (startTime >= slot.start_time && startTime < slot.end_time) ||
            (endTime > slot.start_time && endTime <= slot.end_time)
          );
    })
}
export const setInstructorAvailability =[authenticateUser, async (req, res) => {

    try {
        const validation = timeSlotSchema.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.errors });
          }

          const {date,startTime,endTime} = validation.data;
          const instructorId=req.user.uid;

          const hasConflict=await checkSlotConflict(instructorId,date,startTime,endTime);
             
          if(hasConflict){
            return res.status(400).json({error:'Time slot conflicts with existing availability'});
          }
          await db.collection('availability').add({
            instructor_id: instructorId,
            date,
            start_time: startTime,
            end_time: endTime,
            instructor_id: instructorId,
            status: 'available',
            created_at: Firestore.FieldValue.serverTimestamp(),
            updated_at: Firestore.FieldValue.serverTimestamp()
          });
          res.status(200).json({message:'Availability set successfully'});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error while Settting Availability' });
    }
}]

export const getInstructorAvailability = [authenticateUser, async (req, res) => {
    try {
     const instructorId = req.user.uid;
     const availabilityRef = db.collection('availability');

     const availabilityData = await availabilityRef.where('instructor_id', '==', instructorId).where('status', '==', 'available').orderBy('date').orderBy('start_time').get();

     const availability =  availabilityData.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
     }))

     res.json({availability});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error while fetching availability' });
    }
}]

export const updateInstructorAvailability = [authenticateUser, async (req, res) => {
try {
    const validation = timeSlotSchema.safeParse(req.body)
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
      }

      const {id} = req.params;
      const {date,startTime,endTime} = validation.data;
      const instructorId = req.user.uid;
     
      const availabilityRef = db.collection('availability').doc(id);
      const slot=await availabilityRef.get();
        
      if(!slot.exists || slot.data().instructor_id !== instructorId){
          return res.status(400).json({error:'Slot not found'});
        }
        
        if(slot.data().status === "booked"){
            return res.status(400).json({error:'Slot is already booked'});
        }
        
        const getSlots = await db.collection('availability')
        .where('instructor_id', '==', instructorId)
        .where('date', '==', date)
        .where('status', '==', 'available')
        .get();

        const hasConflict = getSlots.docs.some(doc => {
            const otherSlot = doc.data();
            const otherSlotId = doc.id;
            if (otherSlotId === id) return false;
    
            return (
              (startTime >= otherSlot.start_time && startTime < otherSlot.end_time) ||
              (endTime > otherSlot.start_time && endTime <= otherSlot.end_time) ||
              (startTime <= otherSlot.start_time && endTime >= otherSlot.end_time)
            );
          });
          
          if (hasConflict) {
            return res.status(400).json({ error: 'The requested time overlaps with another slot.' });
          }
    

      await availabilityRef.update({
        date,
        start_time: startTime,
        end_time: endTime,
        updated_at: Firestore.FieldValue.serverTimestamp()
      });

      res.json({ message: 'Availability updated successfully' });
  
}
catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while updating availability' });   
}
}]