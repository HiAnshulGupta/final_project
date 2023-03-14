import React, { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css'


function About() {
    useEffect(() => {
        Aos.init({ duration: 2500, delay: 300 });
    }, []);

    return (
        <div className="bodya">
            <div className="container_AboutUs">
                <div className="Job">
                    <p>Book My Event is providing collaboration platform for small vendors who can organize small scale events and customers who want to host small parties at their own venue.</p>
                </div>
                <div className="website f1">
                  
                    <div data-aos="fade" className="websitecont">
                        BookMyEvent.com Portal is uniquely designed to bridge the gap between a vendor and a customer, in times when digital transformation is becoming a need for the industry. This project typically eases the entire event organisation process cycle.
                    </div>
                </div>
               
                <div data-aos="fade-left" className="team f1">
                    <div className="title">Team</div>
                    <div data-aos="fade-right" className="teamcard">
                       

                        <div className="teamcont">
                            <ul>
                            <li>Anshul Gupta</li>
                                <li>PRN:220941220019</li>
                                <li>anshul2994@gmail.com </li>
                                <li>Ph:7566573279</li>
                            </ul>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="teamcard">
                        
                        <div className="teamcont">
                            <ul>
                                <li>Vinit Shrivastava</li>
                                <li>PRN: 220941220211</li>
                                <li>vinitshrivastava999@gmail.com</li>
                                <li>Ph:9955227206</li>
                            </ul>
                        </div>


                    </div>
                    
                    


                </div>


            </div>
        </div>
    );
}

export default About;

