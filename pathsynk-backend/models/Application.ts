import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
    userId: string;
    jobId: string;
    resumeUrl: string;
    coverLetter: string;
    status: string;
    submittedAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const applicationSchema: Schema<IApplication> = new Schema<IApplication>(
    {
        userId: { type: String, required: true },
        jobId: { type: String, required: true },
        resumeUrl: { type: String, required: true },
        coverLetter: { type: String, required: true },
        status: { type: String, required: true },
        submittedAt: { type: Date, required: true },
    },
    { timestamps: true }
);

const Application = mongoose.model<IApplication>('Application', applicationSchema);
export default Application;
