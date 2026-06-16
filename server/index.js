import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reviewRoute from './routes/review.route.js';
import mongoose from 'mongoose';
import env from 'dotenv'

env.config();

dotenv.config();

const app = express();

// Connect MongoDb
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDb connected"))
.catch((err) => console.error("MongoDb error"  ,  err))

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


app.use('/api/review', reviewRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`sever running on port ${PORT}`));
