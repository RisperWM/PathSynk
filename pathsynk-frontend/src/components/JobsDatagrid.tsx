import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";

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

type JobsDatagridProps = {
    columns: Array<keyof Job>;
};

const COLUMN_LABELS: Record<keyof Job, string> = {
    _id: "ID",
    title: "Title",
    description: "Description",
    company: "Company",
    location: "Location",
    salary: "Salary",
    status: "Status",
    datePosted: "Date Posted",
    createdAt: "Created At",
    updatedAt: "Updated At",
    userId: "User ID",
};

const fetchJobs = async (): Promise<Job[]> => {
    const res = await fetch("http://localhost:5000/api/jobs");
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
};

const JobsDatagrid = ({ columns }: JobsDatagridProps) => {
    const setJobs = useJobStore((state) => state.setJobs);
    const { data: jobs, isLoading, isError } = useQuery<Job[], Error>({
        queryKey: ["jobs"],
        queryFn: fetchJobs,
    });

    useEffect(() => {
        if (jobs) setJobs(jobs);
    }, [jobs, setJobs]);

    if (isLoading) return <p>Loading jobs...</p>;
    if (isError) return <p>Error loading jobs.</p>;

    return (
        <div className="overflow-x-auto rounded-xl shadow bg-white">
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                    <tr>
                        {columns.map((col) => (
                            <th key={col} className="px-4 py-3 text-left">
                                {COLUMN_LABELS[col] || col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                    {jobs?.map((job) => (
                        <tr key={job._id} className="hover:bg-gray-50 border-b">
                            {columns.map((col) => (
                                <td key={col} className="px-4 py-3">
                                    {col === "datePosted" || col === "createdAt" || col === "updatedAt"
                                        ? new Date(job[col]).toLocaleDateString()
                                        : col === "status" ? (
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === "Offer"
                                                        ? "bg-green-100 text-green-600"
                                                        : job.status === "Rejected"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-blue-100 text-blue-600"
                                                    }`}
                                            >
                                                {job.status}
                                            </span>
                                        ) : (
                                            job[col]
                                        )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobsDatagrid;
