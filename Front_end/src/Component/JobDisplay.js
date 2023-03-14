import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function JobDisplay(props) {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [jobs, setjobs] = useState([]);
  const [currentJob, setcurrentJob] = useState(null);
  const [currentIndex, setcurrentIndex] = useState(-1);
  const [searchTitle, setsearchTitle] = useState("");
  const [message, setmessage] = useState("");


  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setsearchTitle(searchTitle);
  };

  const retrieveJobs = () => {
    axios.get(`http:/localhost:8082/get/job`)
      .then((response) => {
        setjobs(response.data);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveJobs();
    setcurrentJob(null);
    setcurrentIndex(-1);
  };

  const setActiveJob = (job, index) => {
    setcurrentJob(job);
    console.log(job);
    setcurrentIndex(index);
  };
  const findByTitle = (jobTitle) => {
    console.log("j Title is : " + typeof jobTitle);
    if (jobTitle === " ") {
      return axios.get(`http://localhost:8082/get/job`);
    }
    else
      return axios.get(`http://localhost:8082/get/job?jobTitle=${jobTitle}`);
  }
  const searchTitle1 = () => {
    findByTitle(searchTitle)
      .then(response => {
        setjobs(response.data)

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const applyJob1 = (id, jobid) => {
    console.log("jobId is : " + jobid);
    return axios.post(`http://localhost:8082/apply/job/${id}/${jobid}`);
  }
  const applyJob = () => {
    console.log(currentJob);
    console.log(currentUser);
    applyJob1(currentUser.userId, currentJob.jobid)
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Job Apply',
          text: 'Applied for Job Successfully'
        });
        setmessage("The job was applied successfully!");
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: 'Job Apply',
          text: 'Job Application failed....Try again'
        })
        setmessage("Application Failed");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("user") == null) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "please login to stay on this page"
      })
      navigate("/Login");
    }
    else {
      retrieveJobs();
    }
  }, []);


  // const { searchTitle, jobs, currentJob, currentIndex } = () =>{}
  return (
    <div>
      <div className="header-main">
        <p>Job Search</p>
      </div>
      <div className="card">
        <div className="mini-card">
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Job Title or click on Search for all job"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div>
              <br />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={searchTitle1} >
                Search
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="list-itemzz">
          <h3>
            <strong>
              <u>Jobs Available</u>
            </strong>
          </h3>

          <ul className="list-group">
            {jobs &&
              jobs.map((job, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveJob(job, index)}
                  key={index}
                >
                  {job.jobTitle} (Company Name:{job.recruiter.compName}) (Vacancy: {job.jobVacancy})
                </li>
              ))}
          </ul>
        </div>
        <br />
        <div>
          {currentJob ? (
            <div>
              <h3>
                <u>Job Details</u>
              </h3>
              <div>
                <label>
                  <strong>Company Name:</strong>
                </label>
                {currentJob.recruiter.compName}
              </div>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>
                {currentJob.jobTitle}
              </div>

              <div>
                <label>
                  <strong>Approximate Vacancies:</strong>
                </label>
                {currentJob.jobVacancy}
              </div>
              <div>
                <label>
                  <strong>Job Type:</strong>
                </label>
                {currentJob.jobType}
              </div>
              <div>
                <label>
                  <strong>Years of experience required:</strong>
                </label>
                {currentJob.reqExp}
              </div>
              <div>
                <label>
                  <strong>Job Location:</strong>
                </label>
                {currentJob.jobLocation}
              </div>
              <div>
                <label>
                  <strong>Approximate Salary (in CTC):</strong>
                </label>
                {currentJob.jobSalary}
              </div>
              <div>
                <label>
                  <strong>Job Description:</strong>
                </label>
                {currentJob.jobDescription}
              </div>
              <br />
              <div>
                <button className="btn btn-success" type="button" onClick={applyJob} >
                  Apply
                </button>
                <Button variant="danger" href="/CandidateDashboard">
                  Return To Dashboard
                </Button>
              </div>
              <br />
              <div className="form-group">
                <b>{message}</b>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <b>Click on a Job or Search to see details</b>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDisplay;
