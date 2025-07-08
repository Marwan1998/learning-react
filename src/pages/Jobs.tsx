import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const Jobs = () => {

    const jobsData = useLoaderData();



  return (
    <div>
        {jobsData.map((job) => (
            <div key={job.id}>
                <h4>{job.title}</h4>
                <p>{job.location}</p>
            </div>
        ))}
    </div>
  )
}

export default Jobs


export const JobsLoader = async () => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    await delay(1000);
    const res = await fetch('http://localhost:5000/jobs');
    return res.json();
};
