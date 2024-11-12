import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js'
import instructorRoute from './routes/instructorRoute.js'
import studentRoute from './routes/studentRoute.js'
import cors from 'cors';
import {db} from './config/firbase.js'
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());


console.log(db)
app.get('/',(req,res)=>{
    res.send('Hello World');

}
);

app.use('/api/auth',authRoute);
app.use('/api/instructor',instructorRoute);
app.use('/api',studentRoute);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}   )