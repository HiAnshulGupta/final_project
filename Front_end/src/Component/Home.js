import React, { useEffect } from "react";
import Typist from 'react-typist';
import Aos from 'aos';
// import logo1 from '../img/shutterstock-1.jpg';
// import logo2 from '../img/banner1.png';
// import logo3 from '../img/secured.jpg';
import 'aos/dist/aos.css'

function Home() {
    useEffect(() => {
        Aos.init({ duration: 2000, delay: 100 });
    }, []);

    return (
        <div className="bodya">
            <div className="container_AboutUs">
                <div className="Job">

                    <p><Typist><span>Welcome To <br></br>Book My Event</span></Typist></p>
                    {/* <p><Typist>Staffing Simplified</Typist></p> */}
                </div>
                <div className="website f1">
                    {/* <div className="websitelogo">
                        <img src={logo1} alt="name" />
                    </div> */}
                    <div data-aos="fade" className="websitecont">
                    This system provides a centralized platform for all the stakeholders involved in an event, including the event organizers, attendees and vendors to collaborate and exchange information and book according to the requirement. With the help of this web portal, vendors can streamline the event which they can organize , reduce manual efforts, and ensure the success of the event.
                    </div>
                    {/* <img src={logo2} alt="name" /> */}
                </div>
                <div data-aos="fade-right" className="technology f1">
                    <div className="title">Technologically Protected</div>
                    <ul>
                        {/* <li>We have used enhanced protection features of JWT based authentication (with bcrypt password hashing) </li>
                        <li>This provides security on multiple layers of attacks and this is what makes our portal a one stop shop for all your recruitment needs in a secure environment.</li> */}
                        <li>Our technology is based on SpringBoot which has a platform-independent build and that helps deploying Web-based enterprise applications online swiftly in no time.</li>
                        <li>React as a frontend is a free and open-source front-end JavaScript library for building user interfaces or UI components.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;