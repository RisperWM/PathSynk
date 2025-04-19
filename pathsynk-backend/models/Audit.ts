import mongoose, { Document, Schema } from 'mongoose';

export interface IAudit extends Document {
    userId: string;
    jobId: string;
    companyId: string;
    interviewId: string;
    noteContent: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const auditSchema: Schema<IAudit> = new Schema<IAudit>(
    {
        userId: { type: String, required: true },
        jobId: { type: String, required: true },
        companyId: { type: String, required: true },
        interviewId: { type: String, required: true },
        noteContent: { type: String, required: true },
    },
    { timestamps: true }
);

const Audit = mongoose.model<IAudit>('Audit', auditSchema);
export default Audit;
