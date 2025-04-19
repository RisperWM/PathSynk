import express, { Request, Response } from 'express';
import Job from '../models/Job';

const router = express.Router();

// Add new job listing
router.post('/add', async (req: Request, res: Response) => {
    try {
        const { title, company, salary, description } = req.body;

        const newJob = new Job({ title, company, salary, description });
        await newJob.save();

        res.status(201).json(newJob);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Get all job listings
router.get('/', async (req: Request, res: Response) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
