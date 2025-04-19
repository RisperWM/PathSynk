import mongoose, { Document, Schema } from 'mongoose';

export interface IInterview extends Document {
    applicationId: string;
    date: Date;
    location: string;
    type: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const interviewSchema: Schema<IInterview> = new Schema<IInterview>(
    {
        applicationId: { type: String, required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        type: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true }
);

const Interview = mongoose.model<IInterview>('Interview', interviewSchema);
export default Interview;
