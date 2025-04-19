import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes'
import applicationRoutes from './routes/applicationRoutes'
import interviewRoutes from './routes/interviewRoutes'
import auditRoutes from './routes/auditRoutes'
import noteRoutes from './routes/noteRoutes'
import companyRoutes from './routes/companyRoutes'
import errorHandler from './middleware/errorHandler';
import morgan from 'morgan';

import cors from 'cors'

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '5000');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/notes', noteRoutes);

app.use(errorHandler);
// mongoose.connect(process.env.MONGODB_URI!)
//     .then(() => console.log('MongoDB connected'))
//     .catch((err: Error) => console.log('MongoDB connection error:', err));

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });


app.get('/', (req: Request, res: Response): void => {
    res.send('Pathsynk Backend is running');
});

app.listen(PORT, (): void => {
    console.log(`Server running on port ${PORT}`);
});
