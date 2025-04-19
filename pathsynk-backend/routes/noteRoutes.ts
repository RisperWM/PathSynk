import express, { Request, Response } from 'express';
import Note from '../models/Notes';

const router = express.Router();

// CREATE a new note
router.post('/', async (req: Request, res: Response) => {
    try {
        const note = new Note(req.body);
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create note', details: error });
    }
});

// GET all notes (with optional population)
router.get('/', async (_req: Request, res: Response) => {
    try {
        const notes = await Note.find()
            .populate('userId', 'name email')
            .populate('jobId', 'title company')
            .populate('companyId', 'name industry')
            .populate('interviewId', 'date location type');
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes', details: error });
    }
});

// GET a single note by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const note = await Note.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('jobId', 'title company')
            .populate('companyId', 'name industry')
            .populate('interviewId', 'date location type');

        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch note', details: error });
    }
});

// UPDATE a note
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update note', details: error });
    }
});

// DELETE a note
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note', details: error });
    }
});

export default router;
