import express from 'express'
import { getInstructorAvailability, setInstructorAvailability, updateInstructorAvailability } from '../controller/instructorController.js';
 

const router=express.Router();

router.post('/availability',setInstructorAvailability)
router.get('/availability',getInstructorAvailability)
router.put('/availability/:id',updateInstructorAvailability)
 
export default router;