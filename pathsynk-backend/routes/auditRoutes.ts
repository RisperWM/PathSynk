import express, { Request, Response } from 'express';
import Audit from '../models/Audit';

const router = express.Router();

// CREATE a new audit entry
router.post('/', async (req: Request, res: Response) => {
    try {
        const audit = new Audit(req.body);
        const savedAudit = await audit.save();
        res.status(201).json(savedAudit);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create audit entry', details: error });
    }
});

// GET all audit entries
router.get('/', async (_req: Request, res: Response) => {
    try {
        const audits = await Audit.find();
        res.status(200).json(audits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch audit entries', details: error });
    }
});

// GET an audit entry by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const audit = await Audit.findById(req.params.id);
        if (!audit) return res.status(404).json({ message: 'Audit entry not found' });
        res.status(200).json(audit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch audit entry', details: error });
    }
});

// UPDATE an audit entry
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedAudit = await Audit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedAudit) return res.status(404).json({ message: 'Audit entry not found' });
        res.status(200).json(updatedAudit);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update audit entry', details: error });
    }
});

// DELETE an audit entry
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedAudit = await Audit.findByIdAndDelete(req.params.id);
        if (!deletedAudit) return res.status(404).json({ message: 'Audit entry not found' });
        res.status(200).json({ message: 'Audit entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete audit entry', details: error });
    }
});

export default router;
