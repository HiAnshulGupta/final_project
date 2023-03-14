
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function HeaderBar() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const role = JSON.parse(localStorage.getItem('userRole'));
    const [showCandidate, setCandidate] = useState(false);
    const [showRecruiter, setRecruiter] = useState(false);


    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");

    }
    const getUser = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setCandidate(user.role === "Candidate");
            // console.log(showCandidate);
            setRecruiter(user.role === "Recruiter");
            // console.log(showRecruiter);
        }
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log("welcome1");

        let setInter = setInterval(getUser, 100);
        getUser();
        if (user) {
            setCandidate(user.role == "Candidate");
            // console.log(showCandidate);
            setRecruiter(user.role == "Recruiter");
            // console.log(showRecruiter);
        }
        // console.log("welcome")

        setTimeout(() => { clearInterval(setInter) }, 25000)

        if (showCandidate == true || showRecruiter == true) {
            // console.log("INsideClearInterval");
            clearInterval(setInter);
        }


    })

    return (
        <div className="App-header">
            <nav className="navbar navbar-expand navbar-dark bg-gradient justify-content-around">
                {/* <Link to={"/home"} className="navbar-brand">
                    <img
                        src={logo}
                        alt="logo"
                        className="logo-img"
                    />
                </Link> */}
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/about"} className="nav-link">
                            About Us
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/contact"} className="nav-link">
                            Contact Us
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/help"} className="nav-link">
                            Help
                        </Link>
                    </li>

                    {(role === "Recruiter") && (
                        <li className="nav-item">
                            <Link to={"/RecruiterDashboard"} className="nav-link">
                                {currentUser.username}'s dashboard
                            </Link>
                        </li>
                    )}

                    {(role === "Candidate") && (
                        <li className="nav-item">
                            <Link to={`/CandidateDashboard`} className="nav-link">
                                {currentUser.username}'s DashBoard
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div class="nav navbar-nav ml-auto">
                        <div className="nav navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={`/Profile/:${currentUser.userId}`} className="nav-link">
                                    {currentUser.username}'s Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logout}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    </div>
                ) : (
                    <div className="nav navbar-nav ml-auto">

                        <li className="nav-item">
                            <Link to={"/Catelogue"} className="nav-link">
                                Catalogue
                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link to={"/vendorlogin"} className="nav-link">
                                Vendor_Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/customerlogin"} className="nav-link">
                                Customer_Login
                            </Link>
                        </li>



                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default HeaderBar



// import React, { Component } from 'react'
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";


// class HeaderBar extends Component {

//     constructor(props) {
//         super(props);
//         this.logOut = this.logOut.bind(this);
//         this.getUser = this.getUser.bind(this);
//         this.state = {

//             showRecruiter: false,
//             showCandidate: false,
//             currentUser: undefined
//         };
//     }
//     getUser() {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user) {
//             this.setState({
//                 currentUser: user,
//                 showRecruiter: user.role === "Recruiter",
//                 showCandidate: user.role === "Candidate",
//             });
//         }
//     }
//     componentDidMount() {
//         const user = JSON.parse(localStorage.getItem('user'));
//         console.log("HiiiMount");
//         setInterval(
//             this.getUser, 1000);

//     }


//     logOut() {
//         localStorage.removeItem("user");
//     }

//     render() {
//         const { currentUser, showRecruiter, showCandidate } = this.state;
//         return (
//             <div className="App-header">
//                 <nav className="navbar navbar-expand navbar-dark bg-gradient">
//                     <Link to={"/home"} className="navbar-brand">

//                     </Link>
//                     <div className="navbar-nav mr-auto">
//                         <li className="nav-item">
//                             <Link to={"/home"} className="nav-link">
//                                 Home
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to={"/about"} className="nav-link">
//                                 About Us
//                             </Link>
//                         </li>

//                         <li className="nav-item">
//                             <Link to={"/contact"} className="nav-link">
//                                 Contact Us
//                             </Link>
//                         </li>

//                         <li className="nav-item">
//                             <Link to={"/help"} className="nav-link">
//                                 Help
//                             </Link>
//                         </li>

//                         {showRecruiter && (
//                             <li className="nav-item">
//                                 <Link to={"/RecruiterDashboard"} className="nav-link">
//                                     {currentUser.username}'s dashboard
//                                 </Link>
//                             </li>
//                         )}

//                         {showCandidate && (
//                             <li className="nav-item">
//                                 <Link to={`/CandidateDashboard`} className="nav-link">
//                                     {currentUser.username}'s DashBoard
//                                 </Link>
//                             </li>
//                         )}
//                     </div>

//                     {currentUser ? (
//                         <div class="nav navbar-nav ml-auto">
//                             <div className="nav navbar-nav ml-auto">
//                                 <li className="nav-item">
//                                     <Link to={`/profile/${currentUser.id}`} className="nav-link">
//                                         {currentUser.username}'s Profile
//                                     </Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <a href="/login" className="nav-link" onClick={this.logOut}>
//                                         LogOut
//                                     </a>
//                                 </li>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="nav navbar-nav ml-auto">
//                             <li className="nav-item">
//                                 <Link to={"/login"} className="nav-link">
//                                     Login
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to={"/register"} className="nav-link">
//                                     Sign Up
//                                 </Link>
//                             </li>
//                         </div>
//                     )}
//                 </nav>
//             </div>
//         )
//     }
// }
// export default HeaderBar;
