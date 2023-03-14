import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, } from 'react-router-dom';
import Swal from 'sweetalert2'

function CandidatesApplied() {
  const navigate = useNavigate();
  const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const { jobid } = useParams();
  const [currentApplication, setcurrentApplication] = useState([]);
  const [currentCandidate, setcurrentCandidate] = useState(null);
  const [candsId, setcandsId] = useState(-1);
  const [currentIndex, setcurrentIndex] = useState(-1);
  // const [selectStatus, setselectStatus] = useState("SHORTLISTED FOR EXAM");
  // const [interviewStatus, setinterviewStatus] = useState("SHORTLISTED FOR INTERVIEW");
  // const [rejectStatus, setRejectStatus] = useState("You are rejected");
  // const interviewStatus = "SHORTLISTED FOR INTERVIEW";
  // const rejectStatus = useState = "You are rejected";
  const [message, setMessage] = useState("");

  const getCandidate = (id) => {
    const url = `http://localhost:8082/applied/status/${jobid}`;
    // const list = axios.get(url);
    // setcurrentApplication(list.data)
    axios.get(url).then((response) => {
      setcurrentApplication(response.data)
    }).catch((error) => {
      alert(error.message);
    })
  };
  const setActiveCandidate = (job, index) => {
    console.log(job);
    setcandsId(job.candidate.candid);
    setcurrentCandidate(job.candidate);
    // console.log(currentCandidate, " current candidate is");
    setcurrentIndex(index);
  }

  const selectCandidate = (currentCandidate) => {
    const jobid1 = jobid;
    const selectStatus = "SHORTLISTED FOR EXAM";
    const candid = candsId;
    console.log("in current candidate :", candid);
    axios.put(`http://localhost:8082/set/status/${selectStatus}/${candid}/${jobid1}`).then(response => {
      console.log(response.data);
      setMessage("The candidate is shortlisted for exam successfully!")
      Swal.fire({
        icon: 'success',
        title: 'Status Update',
        text: 'The candidate is shortlisted for exam successfully!'
      })
    }).catch(e => {
      console.log(e);
      setMessage("Shortlisting Failed!!!")
      Swal.fire({
        icon: 'error',
        title: 'Status Update',
        text: 'Shortlisting Failed!!!'
      })
    })
  }

  const interviewCandidate = (currentCandidate) => {
    const jobid1 = jobid;
    const selectStatus = "SHORTLISTED FOR INTERVIEW";
    const candid = candsId;
    axios.put(`http://localhost:8082/set/status/${selectStatus}/${candid}/${jobid1}`).then(response => {
      console.log(response.data);
      setMessage("The candidate is shortlisted for interview successfully!")
      Swal.fire({
        icon: 'success',
        title: 'Status Update',
        text: 'The candidate is shortlisted for interview successfully!'
      })
    }).catch(e => {
      console.log(e);
      setMessage("Shortlisting Failed!!!")
      Swal.fire({
        icon: 'error',
        title: 'Status Update',
        text: 'Shortlisting Failed!!!'
      })
    })

  }

  const rejectCandidate = (currentCandidate) => {
    const jobid1 = jobid;
    const selectStatus = "You are rejected";
    const candid = candsId;
    axios.put(`http://localhost:8082/set/status/${selectStatus}/${candid}/${jobid1}`).then(response => {
      console.log(response.data);
      setMessage("The candidate is rejected successfully")
      Swal.fire({
        icon: 'success',
        title: 'Status Update',
        text: 'The candidate is rejected successfully'
      })
    }).catch(e => {
      console.log(e);
      setMessage("Shortlisting Failed!!!")
      Swal.fire({
        icon: 'error',
        title: 'Status Update',
        text: 'Shortlisting Failed!!!'
      })
    })
  }
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
      getCandidate(jobid)
    }
  }, [])


  return (
    <div>
      <div className="header-main">Candidate List</div>
      <div className="card">
        <div className='list-itemzz'>
          <ul className="list-group">
            {currentApplication &&
              currentApplication.map((job, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveCandidate(job, index)}
                  key={index}
                >
                  {job.candidate.fullname}
                </li>
              ))}
          </ul>
        </div>
        <br />
        <div>
          {currentCandidate ? (
            <div>
              <h3>
                <u>Candidate Details</u>
              </h3>
              <div>
                <label>
                  <strong>Full Name:</strong>
                </label>
                {currentCandidate.fullname}
              </div>
              <div>
                <label>
                  <strong>Mobile:</strong>
                </label>
                {currentCandidate.mobile}
              </div>
              <div>
                <label>
                  <strong>Gender:</strong>
                </label>
                {currentCandidate.gender}
              </div>
              <div>
                <label>
                  <strong>Current Location:</strong>
                </label>
                {currentCandidate.location}
              </div>
              <div>
                <label>
                  <strong>Skills:</strong>
                </label>
                {currentCandidate.skills}
              </div>
              <div>
                <label>
                  <strong>Highest Qualification:</strong>
                </label>
                {currentCandidate.hqual}
              </div>
              <div>
                <label>
                  <strong>Specialization:</strong>
                </label>
                {currentCandidate.major}
              </div>
              <div>
                <label>
                  <strong>Institute Studied:</strong>
                </label>
                {currentCandidate.institute}
              </div>
              <div>
                <label>
                  <strong>Year Of Qualification:</strong>
                </label>
                {currentCandidate.yoq}
              </div>
              <div>
                <label>
                  <strong>Marks Obtained:</strong>
                </label>
                {currentCandidate.marks}
              </div>
              <div>
                <label>
                  <strong>Does Candidate Have Work Experience?:</strong>
                </label>
                {currentCandidate.exp}
              </div>
              <div>
                <label>
                  <strong>Years of Experience(if yes):</strong>
                </label>
                {currentCandidate.yoexp}
              </div>
              <div>
                <label>
                  <strong>Company Worked:</strong>
                </label>
                {currentCandidate.company}
              </div>
              <div>
                <label>
                  <strong>Field Of Experience:</strong>
                </label>
                {currentCandidate.foexp}
              </div>
              <div>
                <label>
                  <strong>Other Interest / Descriptions:</strong>
                </label>
                {currentCandidate.description}
              </div>
              <br />
              <div className="form-group">
                <div className="micro-card">
                  <div className="status-update">Update Status:</div>
                  <button type="button" className="btn btn-success" onClick={selectCandidate}>Shortlist For Exam</button>{" "}
                  <button type="button" className="btn btn-success" onClick={interviewCandidate} > Shortlist For Interview</button>{" "}
                  <button type="button" className="btn btn-danger" onClick={rejectCandidate}>Reject Candidate</button>{" "}
                </div>
                <br />
              </div>
              <br />
              {message}
            </div>
          ) : (
            <div>
              <br />
              <b>Click on a Candidate to see details and update status</b>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CandidatesApplied


// import React, { useState, useEffect } from "react";
// import DashboardService from "../Services/DashboardService.js";

// const CandidatesApplied = (props) => {
//   const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
//   const [currentApplication, setcurrentApplication] = useState([]);
//   const [currentCandidate, setcurrentCandidate] = useState(null);
//   const [currentIndex, setcurrentIndex] = useState(-1);
//   const [selectStatus, setselectStatus] = useState("SHORTLISTED FOR EXAM");
//   const [interviewStatus, setinterviewStatus] = useState(
//     "SHORTLISTED FOR INTERVIEW"
//   );
//   const [rejectStatus, setrejectStatus] = useState("YOU ARE REJECTED");
//   const [message, setmessage] = useState("");

//   useEffect(() => {
//     getCandidate(props.match.params.id);
//   }, []);

//   const getCandidate = (id) => {
//     DashboardService.appliedCandidates(id)
//       .then((response) => {
//         setcurrentApplication(response.data);

//         console.log(response.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const setActiveCandidate = (job, index) => {
//     setcurrentCandidate(job.candidate);
//     setcurrentIndex(index);
//   };

//   const selectCandidate = () => {
//     DashboardService.setCandidateStatus(
//       selectStatus,
//       currentCandidate.candid,
//       props.match.params.id
//     )
//       .then((response) => {
//         console.log(response.data);
//         setmessage("The candidate is shortlisted for exam successfully!");
//       })
//       .catch((e) => {
//         console.log(e);
//         setmessage("Shortlisting Failed!!!");
//       });
//   };

//   const interviewCandidate = () => {
//     DashboardService.setCandidateStatus(
//       interviewStatus,
//       currentCandidate.candid,
//       props.match.params.id
//     )
//       .then((response) => {
//         console.log(response.data);
//         setmessage("The candidate is shortlisted for interview successfully!");
//       })
//       .catch((e) => {
//         console.log(e);
//         setmessage("Shortlisting Failed!!!");
//       });
//   };

//   const rejectCandidate = () => {
//     DashboardService.setCandidateStatus(
//       rejectStatus,
//       currentCandidate.candid,
//       props.match.params.id
//     )
//       .then((response) => {
//         console.log(response.data);
//         setmessage("The candidate is rejected successfully!");
//       })
//       .catch((e) => {
//         console.log(e);
//         setmessage("Rejection Failed!!!");
//       });
//   };

//   return (
//     <div>
//       <div className="header-main">Candidate List</div>
//       <div className="card">
//         <div>
//           <ul className="list-group">
//             {currentApplication &&
//               currentApplication.map((job, index) => (
//                 <li
//                   className={
//                     "list-group-item " +
//                     (index === currentIndex ? "active" : "")
//                   }
//                   onClick={() => setActiveCandidate(job, index)}
//                   key={index}
//                 >
//                   {job.candidate.fullname}
//                 </li>
//               ))}
//           </ul>
//         </div>
//         <br />
//         <div>
//           {currentCandidate ? (
//             <div>
//               <h3>
//                 <u>Candidate Details</u>
//               </h3>
//               <div>
//                 <label>
//                   <strong>Full Name:</strong>
//                 </label>
//                 {currentCandidate.fullname}
//               </div>
//               <div>
//                 <label>
//                   <strong>Mobile:</strong>
//                 </label>
//                 {currentCandidate.mobile}
//               </div>
//               <div>
//                 <label>
//                   <strong>Gender:</strong>
//                 </label>
//                 {currentCandidate.gender}
//               </div>
//               <div>
//                 <label>
//                   <strong>Current Location:</strong>
//                 </label>
//                 {currentCandidate.location}
//               </div>
//               <div>
//                 <label>
//                   <strong>Skills:</strong>
//                 </label>
//                 {currentCandidate.skills}
//               </div>
//               <div>
//                 <label>
//                   <strong>Highest Qualification:</strong>
//                 </label>
//                 {currentCandidate.hqual}
//               </div>
//               <div>
//                 <label>
//                   <strong>Specialization:</strong>
//                 </label>
//                 {currentCandidate.major}
//               </div>
//               <div>
//                 <label>
//                   <strong>Institute Studied:</strong>
//                 </label>
//                 {currentCandidate.institute}
//               </div>
//               <div>
//                 <label>
//                   <strong>Year Of Qualification:</strong>
//                 </label>
//                 {currentCandidate.yoq}
//               </div>
//               <div>
//                 <label>
//                   <strong>Marks Obtained:</strong>
//                 </label>
//                 {currentCandidate.marks}
//               </div>
//               <div>
//                 <label>
//                   <strong>Does Candidate Have Work Experience?:</strong>
//                 </label>
//                 {currentCandidate.exp}
//               </div>
//               <div>
//                 <label>
//                   <strong>Years of Experience(if yes):</strong>
//                 </label>
//                 {currentCandidate.yoexp}
//               </div>
//               <div>
//                 <label>
//                   <strong>Company Worked:</strong>
//                 </label>
//                 {currentCandidate.company}
//               </div>
//               <div>
//                 <label>
//                   <strong>Field Of Experience:</strong>
//                 </label>
//                 {currentCandidate.foexp}
//               </div>
//               <div>
//                 <label>
//                   <strong>Other Interest / Descriptions:</strong>
//                 </label>
//                 {currentCandidate.description}
//               </div>
//               <br />
//               <div className="form-group">
//                 <div className="micro-card">
//                   <div className="status-update">Update Status:</div>
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={selectCandidate}
//                   >
//                     Shortlist For Exam
//                   </button>{" "}
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={interviewCandidate}
//                   >
//                     Shortlist For Interview
//                   </button>{" "}
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     onClick={rejectCandidate}
//                   >
//                     Reject Candidate
//                   </button>{" "}
//                 </div>
//                 <br />
//               </div>
//               <br />
//               {message}
//             </div>
//           ) : (
//             <div>
//               <br />
//               <b>Click on a Candidate to see details and update status</b>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CandidatesApplied;
