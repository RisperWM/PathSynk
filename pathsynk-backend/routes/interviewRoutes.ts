import express, { Request, Response } from 'express';
import Interview, { IInterview } from '../models/Interview';

const router = express.Router();

// Create a new interview
router.post('/', async (req: Request, res: Response) => {
    try {
        const { applicationId, date, location, type, status } = req.body;

        const newInterview: IInterview = new Interview({
            applicationId,
            date,
            location,
            type,
            status,
        });

        await newInterview.save();
        res.status(201).json(newInterview);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get all interviews
router.get('/', async (_req: Request, res: Response) => {
    try {
        const interviews = await Interview.find();
        res.status(200).json(interviews);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get interview by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        res.status(200).json(interview);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Update interview
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { applicationId, date, location, type, status } = req.body;

        const updatedInterview = await Interview.findByIdAndUpdate(
            req.params.id,
            { applicationId, date, location, type, status, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedInterview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        res.status(200).json(updatedInterview);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Delete interview
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedInterview = await Interview.findByIdAndDelete(req.params.id);

        if (!deletedInterview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        res.status(200).json({ message: 'Interview deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
