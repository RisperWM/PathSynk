import {create} from 'zustand';

interface Job {
    _id:string;
    title: string;
    description: string;
    company: string;
    location: string;
    salary: string;
    status: string;
    datePosted: string;
    createdAt: string;
    updatedAt: string;
    userId: string;

}

interface JobsState {
    jobs:Job[];
    setJobs:(jobs:Job[]) => void;
}

export const useJobStore = create<JobsState>((set) => ({
    jobs:[],
    setJobs: (jobs) => set({jobs}),
}));