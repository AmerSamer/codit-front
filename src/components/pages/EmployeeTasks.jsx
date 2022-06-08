import React from "react"
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import NavNotAdmin from "../nav/navNotAdmin";
const portLocal = "http://localhost:4001"

const EmployeeTasks = () => {
    const navigate = useNavigate();
    const employeeTasksAllST = useLocation().state; //get allEmployeeTasks State from father component
    const employeeTasksST = employeeTasksAllST.split("-")[0] //get Id Employee State from father component
    const employeeTasksNameST = employeeTasksAllST.split("-")[1] //get Name Employee State from father component
    const [error, setError] = React.useState("");
    const [privateData, setPrivateData] = React.useState({ admin: true });
    const [employeeTasks, setEmployeeTasks] = React.useState([]);
    const [employeeDetails, setEmployeeDetails] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);

    console.log(employeeTasksAllST);
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
                if (employeeTasksST) {
                    setPrivateData(data.user);
                    getEmployeeTasks()
                    getEmployeeDetails()
                } else {
                    localStorage.removeItem("authTokenCodit");
                    setError("You are not authorized please login");
                }
            } catch (error) {
                localStorage.removeItem("authTokenCodit");
                setError("You are not authorized please login");
            }
        };
        fetchPrivateDate();
    }, [refresh]);

    const getEmployeeTasks = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
            },
        };
        const response = await axios.get(`${portLocal}/v1/getEmployeeTasks/${employeeTasksST}`, config);
        setEmployeeTasks(response.data);
    }
    const getEmployeeDetails = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
            },
        };
        const response = await axios.get(`${portLocal}/v1/getEmployeeDetails/${employeeTasksST}`, config);
        setEmployeeDetails(response.data);
    }
    const startBtnHandler = async (id, idemp) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
            },
        };
        await axios.put(`${portLocal}/v1/startEmployeeTasks/${id}`, { idemp }, config)
            .then((res) => {
                if (res.status === 200) {
                    // navigate('/employees')
                    setRefresh(!refresh)
                }
                else {
                    alert("Something went wrong")
                }
            }).catch((err) => {
                alert(`ERROR`)
            })
    }
    const endBtnHandler = async (id, idemp) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
            },
        };
        await axios.put(`${portLocal}/v1/endEmployeeTasks/${id}`, { idemp }, config)
            .then((res) => {
                if (res.status === 200) {
                    // navigate('/employees')
                    setRefresh(!refresh)
                }
                else {
                    alert("Something went wrong")
                }
            }).catch((err) => {
                alert(`ERROR`)
            })
    }
    return error ? (
        <Navigate to="/login" />
    ) : (
        <div className="employees">
            <NavNotAdmin />
            <div className='container'>
                <div className="container_content">
                    <div className="container_content_inner">
                        <div className="title">
                            <h1>@{employeeTasksNameST} Tasks</h1>
                        </div>
                        <div className="par">
                            {employeeTasks.length === 0 ? (
                                <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                                    <div style={{ fontSize: "160%", fontFamily: "sans-serif" }}>No Employee Tasks Found.</div>
                                </div>
                            ) : (
                                <div >
                                    <table id="employees_table_data">
                                        <thead>
                                        </thead>
                                        <tbody>
                                            {employeeTasks.map((emp, index) => {
                                                return (<tr key={index} >
                                                    <td >{emp.id}</td>
                                                    <td >{emp.name}</td>
                                                    <td >{emp.createdDate}</td>
                                                    { }
                                                    {(emp.assign[emp.assign.findIndex((r) => r.id === employeeDetails._id)].start === false) && (emp.assign[emp.assign.findIndex((r) => r.id === employeeDetails._id)].end === false) ? <td style={{ width: "15%" }}><button className='btn btn-success' onClick={() => startBtnHandler(emp._id, employeeTasksST)}>Start</button></td> : ""}
                                                    {(emp.assign[emp.assign.findIndex((r) => r.id === employeeDetails._id)].start === true) && (emp.assign[emp.assign.findIndex((r) => r.id === employeeDetails._id)].end === false) ? <td style={{ width: "15%" }}><button className='btn btn-danger' onClick={() => endBtnHandler(emp._id, employeeTasksST)}>End</button></td> : ""}
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay"></div>
            {/* <PopupRemove id={buttonPopup.id} trigger={buttonPopup.bool} setTrigger={setButtonPopup} allEmployees={allEmployees} setAllEmployees={setAllEmployees}>
            <i style={{ fontSize: "50px" }} className="fa fa-trash" aria-hidden="true"></i>
            <h3>Delete Permanently</h3>
            <h6>Are you sure you want to delete <span style={{ fontWeight: "bold" }}>{buttonPopup.idEmployee}-{buttonPopup.fullName}</span> employee?</h6>
          </PopupRemove> */}
        </div>
    )
}

export default EmployeeTasks