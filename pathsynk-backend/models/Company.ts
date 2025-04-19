import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
    name: string;
    industry: string;
    location: string;
    website: string;
    about: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const companySchema: Schema<ICompany> = new Schema<ICompany>(
    {
        name: { type: String, required: true },
        industry: { type: String, required: true },
        location: { type: String, required: true },
        website: { type: String, required: true },
        about: { type: String, required: true },
    },
    { timestamps: true }
);

const Company = mongoose.model<ICompany>('Company', companySchema);
export default Company;
