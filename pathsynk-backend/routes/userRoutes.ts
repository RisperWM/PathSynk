import express, { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
}

// Register route
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password, status, profile } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({
            username,
            email,
            password,
            status,
            profile
        });

        await newUser.save();

        const token = generateToken(newUser._id.toString());
        res.status(201).json({ user: newUser, token });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Login route
router.post('/login', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id.toString());

        res.status(200).json({ user, token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
});

// Update user route
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { username, status, profile } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, status, profile, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
