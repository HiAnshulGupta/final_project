import { Route, Routes } from "react-router-dom";
import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import VendorLogin from "./Component/VendorLogin";
import CustomerLogin from "./Component/CustomerLogin";
import RegisterVendor from "./Component/RegisterVendor";
import Home from "./Component/Home";
import Help from "./Component/Help";
import FooterBar from "./Component/FooterBar";
import HeaderBar from "./Component/HeaderBar";
import EditCustomerProfile from "./Component/EditCustomerProfile";
import EditVendorProfile from "./Component/EditVendorProfile";
import Contact from "./Component/Contact";
import Register from "./Component/Register";
import Catelogue from "./Component/Catelogue";

// import JobDisplay from "./Component/JobDisplay";
// import CustomerDashboard from "./Component/CustomerDashboard";
// import CandidatesApplied from "./Component/CandidatesApplied";
import VendorDashboard from "./Component/VendorDashboard";
// import JobPost from "./Component/JobPost";
//import CheckStatus from "./Component/CheckStatus";


// import Profile from "./Component/Profile";
import About from "./Component/About";
import RegisterCustomer from "./Component/RegisterCustomer";


function App() {
  return (
    <div className="App">
      <HeaderBar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>

          <Route path="/about" element={<About />}></Route>
          <Route path="/Header" element={<HeaderBar></HeaderBar>}></Route>
          {/* <Route path="/Profile/:id" element={<Profile />}></Route> */}


          {/* <Route path="/checkStatus/:id" element={<CheckStatus />}></Route> */}
          <Route path="/VendorDashboard" element={<VendorDashboard />}></Route>
          {/* <Route path="/JobPost" element={<JobPost />}></Route> */}
          {/* <Route path="/CandidateApplied/:jobid" element={<CandidatesApplied />}></Route> */}
          {/* <Route path="/CustomerDashboard" element={<CustomerDashboard />}></Route> */}
          {/* <Route path="/get/job" element={<JobDisplay></JobDisplay>}></Route> */}


          <Route path="/EditCustomer/:id" element={<EditCustomerProfile />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/EditVendor/:id" element={<EditVendorProfile />}></Route>
          <Route path="/RegisterCustomer" element={<RegisterCustomer />}></Route>
          <Route path="/VendorLogin" element={<VendorLogin />}></Route>
          <Route path="/CustomerLogin" element={<CustomerLogin />}></Route>
          <Route path="/RegisterVendor" element={<RegisterVendor />}></Route>
          <Route path="/Catelogue" element={<Catelogue />}></Route>

          <Route path="/Help" element={<Help />}></Route>
        </Routes>
      </div>
      <FooterBar />
    </div>

  );
}

export default App;
