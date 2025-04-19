import mongoose, { Document, Schema, Types } from 'mongoose';

export interface INote extends Document {
    userId: Types.ObjectId;
    jobId: Types.ObjectId;
    companyId: Types.ObjectId;
    interviewId: Types.ObjectId;
    noteContent: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const noteSchema = new Schema<INote>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        jobId: {
            type: Schema.Types.ObjectId,
            ref: 'Job',
            required: true,
        },
        companyId: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
        interviewId: {
            type: Schema.Types.ObjectId,
            ref: 'Interview',
            required: true,
        },
        noteContent: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model<INote>('Note', noteSchema);
export default Note;
