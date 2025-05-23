import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: string;
    dateJoined: Date;
    status: string;
    profile: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' },
        dateJoined: { type: Date, default: Date.now },
        status: { type: String, required: true },
        profile: { type: String, required: false },
    },
    { timestamps: true }
);

// Automatically hash password before saving
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err as Error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
