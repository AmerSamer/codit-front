import React from 'react';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import Nav from '../nav/nav';
import NavNotAdmin from "../nav/navNotAdmin";
import '../nav/nav.css'
import './PrivateScreen.css'
const portLocal = "http://localhost:4001"
const port = "https://codit-back.herokuapp.com"

const PrivateScreen = () => {
    const navigate = useNavigate();
    const [error, setError] = React.useState("");
    const [privateData, setPrivateData] = React.useState({ admin: true });
    const [allEmployees, setAllEmployees] = React.useState([]);
    const [selectedEmployeeTasks, setSelectedEmployeeTasks] = React.useState("");

    React.useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
                },
            };

            try {
                const { data } = await axios.get(`${port}/api/private`, config);
                setPrivateData(data.user);
                getAllEmployees() //axios get getAllOrders after setting token
            } catch (error) {
                localStorage.removeItem("authTokenCodit");
                setError("You are not authorized please login");
            }
        };

        fetchPrivateDate();

    }, []);
    const getAllEmployees = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
            },
        };
        const response = await axios.get(`${port}/v1/getAllEmployees/`, config);
        setAllEmployees(response.data);
    }
    const goToEmployees = () => {
        navigate('/employees')
    }
    const goToTasks = () => {
        navigate('/tasks')
    }
    const selectEmployeeHandler = (e) => {
        if (e.target.value !== "Choose your name") {
            setSelectedEmployeeTasks(e.target.value)
        } else {
            setSelectedEmployeeTasks("")
        }

    }
    const goToEmployeeTasks = () => {
        if (selectedEmployeeTasks !== "" && selectedEmployeeTasks !== "Choose your name") {
            navigate('/employeeTasks', {state : selectedEmployeeTasks})
        } else {
            alert("choose name")
        }

    }

    return error ? (
        <Navigate to="/login" />
    ) : (
        <div id='dashboard' style={{ overflow: "hidden" }}>
            {privateData.admin ? (
                <>
                    <Nav />
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
                </>
            ) : (
                <>
                    <NavNotAdmin />
                    <div style={{ textAlign: "left", marginLeft: "8%", marginTop: "5%" }}>
                        <div style={{ fontSize: "130%", fontFamily: "sans-serif", color: "white" }}>Welcome Back <span style={{ color: "darkgoldenrod" }}>@{privateData.username}</span></div>
                    </div>
                    <div style={{ textAlign: "center", height: "100%", marginTop: "12%" }}>
                        <div style={{ fontSize: "160%", fontFamily: "sans-serif", color: "white" }}>LET`S MAKE SOMETHING <span style={{ color: "dodgerblue" }}>GREAT!</span></div>
                        <div style={{ padding: '20px' }}>
                            <div className="field">
                                {/* <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "1%", fontSize: "100%" }} >צבע</label> */}
                                <div className="two fields">
                                    <div className="field">
                                        <select name="employeeSelect" className="employee_select" placeholder='chose' style={{ width: "20%", height: "5vh", backgroundColor: "rgba(255,255,255,0.8)" }} onChange={selectEmployeeHandler} >
                                            <option >Choose your name</option>
                                            {allEmployees.map((emp, index) => {
                                                return (
                                                    <option key={index}>{emp.id}-{emp.fullName}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {selectedEmployeeTasks === "" || selectedEmployeeTasks === "Choose your name" ? (
                                <></>
                            ) : (
                                <button style={{ margin: '1rem', fontSize: "1rem" }} className='btn btn-outline-success' onClick={goToEmployeeTasks}>Go To "{selectedEmployeeTasks}" Tasks</button>
                            )}
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}
export default PrivateScreen;