import express, {Request, Response} from 'express';
import Application, {IApplication} from '../models/Application';

const router = express.Router();

//create new application
router.post('/', async(req:Request, res:Response) => {
    try {
        const { userId, jobId, resumeUrl, coverLetter, status, submittedAt } = req.body;

        const newApplication: IApplication = new Application({
            userId,
            jobId,
            resumeUrl,
            coverLetter,
            status,
            submittedAt,
        });

        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (error:any) {
        res.status(500).json({message:error.message});
    }
});

//get all application
router.get('/', async(req:Request, res:Response) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error:any) {
        res.status(500).json({message:error.message});
    }
});

//get application by ID
router.put('/:id', async( req:Request, res:Response) => {
    try {
        const { userId, jobId, resumeUrl, coverLetter, status, submittedAt } = req.body;
        const updatedApplication: IApplication | null = await Application.findByIdAndUpdate(
            req.params.id,
            { userId, jobId, resumeUrl, coverLetter, status, submittedAt, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(updatedApplication);

    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

//delete an application
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedApplication = await Application.findByIdAndDelete(req.params.id);

        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;