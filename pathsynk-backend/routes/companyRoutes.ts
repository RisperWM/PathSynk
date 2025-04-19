import express, { Request, Response } from 'express';
import Company from '../models/Company';

const router = express.Router();

// CREATE a new company
router.post('/', async (req: Request, res: Response) => {
    try {
        const company = new Company(req.body);
        const savedCompany = await company.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create company', details: error });
    }
});

// GET all companies
router.get('/', async (_req: Request, res: Response) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch companies', details: error });
    }
});

// GET a company by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ message: 'Company not found' });
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch company', details: error });
    }
});

// UPDATE a company
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCompany) return res.status(404).json({ message: 'Company not found' });
        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update company', details: error });
    }
});

// DELETE a company
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedCompany = await Company.findByIdAndDelete(req.params.id);
        if (!deletedCompany) return res.status(404).json({ message: 'Company not found' });
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete company', details: error });
    }
});

export default router;
