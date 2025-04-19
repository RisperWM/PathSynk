import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document{
    title:string;
    description:string;
    company:string;
    location:string;
    salary:string;
    status:string;
    datePosted:string;
    createdAt:string;
    updatedAt:string;
    userId:string;
}

const jobSchema: Schema<IJob> = new Schema<IJob>({
    title: {type: String, required:true},
    description: {type: String, required:true},
    company: { type: String, required:true},
    location: { type: String, required: true },
    salary: { type: String, required: true },
    status: { type: String, required: true },
    datePosted: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    userId: { type: String, required: true },
});

const Job = mongoose.model<IJob>('Job', jobSchema);
export default Job;