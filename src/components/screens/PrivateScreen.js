import React from 'react';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import Nav from '../nav/nav';
import NavNotAdmin from "../nav/navNotAdmin";
import '../nav/nav.css'
import './PrivateScreen.css'
const portLocal = "http://localhost:4001"

const PrivateScreen = () => {
    const navigate = useNavigate();
    const [error, setError] = React.useState("");
    const [privateData, setPrivateData] = React.useState({ admin: true });

    React.useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
                },
            };

            try {
                const { data } = await axios.get(`${portLocal}/api/private`, config);
                setPrivateData(data.user);
                // getAllOrders() //axios get getAllOrders after setting token
            } catch (error) {
                localStorage.removeItem("authTokenCodit");
                setError("You are not authorized please login");
            }
        };

        fetchPrivateDate();

    }, []);

    const goToEmployees = () => {
        navigate('/employees')
    }
    const goToTasks = () => {
        navigate('/tasks')
    }
    return error ? (
        <Navigate to="/login" />
    ) : (
        <div id='dashboard' style={{ overflow: "hidden" }}>
            {privateData.admin ? <Nav /> : <NavNotAdmin />}
            <div style={{ textAlign: "left", marginLeft: "8%", marginTop: "5%" }}>
                <div style={{ fontSize: "130%", fontFamily: "sans-serif", color: "white" }}>Welcome Back <span style={{ color: "darkgoldenrod" }}>@{privateData.username}</span></div>
            </div>
            <div style={{ textAlign: "center", height: "100%", marginTop: "12%" }}>
                <div style={{ fontSize: "160%", fontFamily: "sans-serif", color: "white" }}>LET`S MAKE SOMETHING <span style={{ color: "dodgerblue" }}>GREAT!</span></div>
                <div style={{ padding: '20px' }}>
                    <button style={{ margin: '1rem', fontSize: "1rem" }} className='btn btn-outline-success' onClick={goToEmployees}>EMPLOYEES</button>
                    <button style={{ margin: '1rem' }} className='btn btn-outline-success' onClick={goToTasks}>TASKS</button>
                </div>
            </div>
        </div>
    )
}
export default PrivateScreen;