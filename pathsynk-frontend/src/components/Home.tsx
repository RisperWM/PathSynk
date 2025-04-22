import DashCard from "./DashCard"
import JobListing from "./JobListing"

const Home = () => {
  return (
    <div>
      <p className="text-blue-950 font-bold text-lg">SUMMARY DASHBOARD</p>
      <DashCard/>
      <div className="flex flex-row mt-5">
        <div className="w-3/4 border-r border-blue-950">
          <p className="text-blue-950 font-bold text-md  mb-2">JOB APPLICATION</p>
          <JobListing />
        </div>
        <div className="w-1/4">
          <p className="text-blue-950 font-bold text-md mb-2">REMINDERS</p>
        </div>
      </div>
    </div>
  )
}

export default Home