import { Briefcase, CalendarCheck, BadgeCheck, ThumbsDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useJobStore } from "../store/useJobStore";
import { useInterviewsStore } from "../store/useInterviewStore";
import { useEffect } from "react";
import backgroundImage from "../assets/backgroundImage.jpg";

type Job = {
    _id: string;
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
};

type Interview = {
    _id: string;
    applicationId: string;
    date: Date;
    location: string;
    type: string;
    status: string;
};

const fetchJobs = async (): Promise<Job[]> => {
    const res = await fetch("http://localhost:5000/api/jobs");
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
};

const fetchInterviews = async (): Promise<Interview[]> => {
    const res = await fetch("http://localhost:5000/api/interviews");
    if (!res.ok) throw new Error("Failed to fetch interviews");
    return res.json();
};

type CardProps = {
    icon: any;
    label: string;
    value: number;
    valueColor: string;
};

const Card = ({ icon, label, value, valueColor }: CardProps) => (
    <div
        className="relative p-6 rounded-xl shadow hover:shadow-2xl transition"
        style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl z-0" />
        <div className="relative z-10 flex flex-row justify-between items-center gap-3 text-white">
            <div>
                {icon}
                <h3 className="text-xl font-semibold mt-1">{label}</h3>
            </div>
            <p className={`text-4xl font-bold ${valueColor}`}>{value}</p>
        </div>
    </div>
);

const DashCard = () => {
    const setJobs = useJobStore((state) => state.setJobs);
    const setInterviews = useInterviewsStore((state) => state.setInterviews);

    const {
        data: jobsData,
        isLoading: jobsLoading,
        isError: jobsError,
    } = useQuery<Job[], Error>({ queryKey: ["jobs"], queryFn: fetchJobs });

    const {
        data: interviewsData,
        isLoading: interviewsLoading,
        isError: interviewsError,
    } = useQuery<Interview[], Error>({
        queryKey: ["interviews"],
        queryFn: fetchInterviews,
    });

    useEffect(() => {
        if (jobsData) setJobs(jobsData);
    }, [jobsData, setJobs]);

    useEffect(() => {
        if (interviewsData) setInterviews(interviewsData);
    }, [interviewsData, setInterviews]);

    if (jobsLoading || interviewsLoading) return <div>Loading...</div>;
    if (jobsError || interviewsError) return <div>Error loading data</div>;

    const applied = jobsData?.length ?? 0;
    const interviews = interviewsData?.length ?? 0;
    const offers = jobsData?.filter((job) => job.status.toLowerCase() === "offer").length ?? 0;
    const rejections = jobsData?.filter((job) => job.status.toLowerCase() === "rejected").length ?? 0;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <Card
                icon={<Briefcase className="w-8 h-8 text-blue-400 mb-2" />}
                label="Jobs Applied"
                value={applied}
                valueColor="text-blue-300"
            />
            <Card
                icon={<CalendarCheck className="w-8 h-8 text-green-400 mb-2" />}
                label="Interviews Scheduled"
                value={interviews}
                valueColor="text-green-300"
            />
            <Card
                icon={<BadgeCheck className="w-8 h-8 text-purple-400 mb-2" />}
                label="Offers Received"
                value={offers}
                valueColor="text-purple-300"
            />
            <Card
                icon={<ThumbsDown className="w-8 h-8 text-red-400 mb-2" />}
                label="Rejections"
                value={rejections}
                valueColor="text-red-300"
            />
        </div>
    );
};

export default DashCard;
