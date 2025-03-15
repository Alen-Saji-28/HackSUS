import React, { useState } from "react";
import "../styles/jobfeed.css";

const dummyJobs = [
  { id: 1, waste_type: "Plastic", weight: "5kg", address: "Street 1" },
  { id: 2, waste_type: "Organic", weight: "3kg", address: "Street 2" },
];

const JobFeed = () => {
  const [jobs, setJobs] = useState(dummyJobs); // Ensure state is initialized

  const acceptJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
    alert("Job accepted!");
  };

  return (
    <div className="jobfeed-container">
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.waste_type}</strong> - {job.weight} at {job.address}
              <button onClick={() => acceptJob(job.id)}>Accept</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobFeed;
