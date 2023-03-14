import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function CheckStatus(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [status, setStatus] = useState("Currently Working on Application");

    const checkStatus = (id, jobid) => {
        const API_URL = `http://localhost:8082/view/status/${id}/${jobid}`;

        axios.get(API_URL).then(response => {
            setStatus(response.data.status);
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
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
            checkStatus(currentUser.userId, id);
        }
    });

    return (
        <div>
            <div className="header-main">
                Current Application Status
            </div>
            <div className="card">
                <div className="mini-card">
                    <h2><u>Current Status:</u></h2> {' '}

                    <div><b>*{status}*</b></div>
                    <br />
                    <Button variant="danger" href="/home">Return To Dashboard</Button>
                </div>
            </div>
        </div>
    )
}

export default CheckStatus