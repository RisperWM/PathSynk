import JobsDatagrid from './JobsDatagrid'

const JobListing = () => {
  return (
    <div>
          <JobsDatagrid columns={["title", "company", "status", "datePosted"]} />
    </div>
  )
}

export default JobListing