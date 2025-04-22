import {create} from 'zustand';

interface Interview {
    _id:string;
    applicationId: string;
    date: Date;
    location: string;
    type: string;
    status: string;
}

interface InterviewsState {
    interviews:Interview[];
    setInterviews: (interviews:Interview[]) => void;
}

export const useInterviewsStore = create<InterviewsState>((set) => ({
    interviews:[],
    setInterviews:(interviews) => set({interviews}),
}));