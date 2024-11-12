import express from 'express'
import { bookSlot, getBookings, getInstructors, getSlots } from '../controller/studentController.js';
 

const router=express.Router();

router.get('/slots',getSlots)
router.get('/instructors',getInstructors)
router.post('/bookings',bookSlot)
router.get('/bookings',getBookings)
export default router;