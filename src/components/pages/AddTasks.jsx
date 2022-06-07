import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import './addEmployees.css'
import PopupSave from "./PupupSave";
// import PopupAddOrder from "./PopupAddOrder";
// const port = "https://carpentry-production-back.herokuapp.com"
const portLocal = "http://localhost:4001"

const AddTasks = ({ id, name, assign }) => {
    const navigate = useNavigate();
    const allTasksST = useLocation().state[0]; //get allTasks State from father component
    const allEmployeesST = useLocation().state[1]; //get allEmployeesST State from father component
    const [error, setError] = React.useState("");
    const [privateData, setPrivateData] = React.useState("");
    const [addNewTaskST, setAddNewTaskST] = React.useState({
        id: id,
        name: name,
        status: "waiting",
        assign: assign,
        createdDate: (new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" + ((new Date().getDate()) < 10 ? "0" + (new Date().getDate()) : (new Date().getDate()))),
    });
    const [buttonPopup, setButtonPopup] = React.useState([{
        bool: false,
    }])
    const [selectedAssignEmployees, setSelectedAssignEmployees] = React.useState([]);

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
                if (allTasksST && data.user.admin) {
                    setPrivateData(data.user);
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
    }, []);
    const backToTasksClickBtn = () => {
        navigate('/tasks')
    }
    const addNewTaskHandler = (e) => {
        setAddNewTaskST({
            ...addNewTaskST,
            [e.target.name]: (e.target.value)
        })
    }
    const selectEmployeeHandler = (event) => {
        const isExistEmployee = selectedAssignEmployees.find(i => i.idname === event.target.value)
        if (!isExistEmployee && event.target.value !== "Assign Employees") {
            setSelectedAssignEmployees(s => {
                return [
                    ...s,
                    {
                        idname: event.target.value,
                        start: false,
                        end: false
                    }
                ];
            });
        }
    }
    const submitNewTaskHandler = (event) => {
        event.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
            },
        };
        const t = {
            id: addNewTaskST.id,
            name: addNewTaskST.name,
            status: "waiting",
            assign: selectedAssignEmployees,
            createdDate: (new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" + ((new Date().getDate()) < 10 ? "0" + (new Date().getDate()) : (new Date().getDate()))),

        }
        console.log(t);
        // axios.post(`${portLocal}/v1/newTask`, addNewTaskST, config)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             navigate('/tasks')
        //         }
        //         else {
        //             alert("Something went wrong")
        //         }
        //     }).catch((err) => {
        //         alert(`ERROR`)
        //     })
    }

    return error ? (
        <Navigate to="/login" />
    ) : (
        <div id="add_employee">
            <div className="add_employee_form">
                <form onSubmit={submitNewTaskHandler} >
                    <div /*style={{ padding: "1rem", marginTop: "1rem" }}*/>
                        <button type="button" className="btn btn-secondary" onClick={backToTasksClickBtn}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    </div>
                    {/* <hr /> */}
                    <div style={{ letterSpacing: "7px", textAlign: "center", padding: "1rem", fontSize: '23px', marginTop: "0rem" }}>
                        Add Task
                    </div>
                    <div className="form-group" style={{ width: "100%", overflow: "hidden" }}>
                        <h4 className="ui dividing header" style={{ marginTop: "1rem" }}>Task Details</h4>
                        {/* // */}
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >ID</label>
                            <div className="two fields">
                                <div className="field">
                                    <input type="text" name="id" pattern="[0-9]{1,}" title="Should contain one or more digits" required placeholder="" onChange={addNewTaskHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >Name</label>
                            <div className="two fields">
                                <div className="field">
                                    <input type="text" name="name" pattern="[a-z]{1,}[0-9]{0,}" title="Should contain only lowercase letters and numbers" required placeholder="" onChange={addNewTaskHandler} />
                                </div>
                            </div>
                        </div>
                        {/* // */}
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >Assign</label>
                            <div className="two fields">
                                <div className="field">
                                    <select name="assign" className="employee_select" style={{ boxSizing: "border-box", width: "100%", height: "6vh", backgroundColor: "rgba(255,255,255,0.3)" }} onChange={selectEmployeeHandler} >
                                        <option>Assign Employees</option>
                                        {allEmployeesST.map((emp, index) => {
                                            return (
                                                <option key={index}>{emp.id}-{emp.fullName}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <hr />
                            <div>
                                {selectedAssignEmployees.map((slcemp, index) => {
                                    return (
                                        <div key={index} className="sss">
                                            <div style={{ width: "70%", float: "left", fontSize: "110%", fontWeight: "400" }} /*onClick={()=>test(slcemp.id)}*/>{slcemp.idname}</div>
                                            <div style={{ marginLeft: "90%" }}><i className="btn-delete fas fa-trash-alt"></i></div>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* <div>
                                {selectedAssignEmployees.length!==0?selectedAssignEmployees.map((slcemp, index) => {
                                    return (
                                        <div key={index} className="sss">
                                            <div style={{width: "70%", float: "left", fontSize: "110%", fontWeight: "400" }}>{slcemp}</div>
                                            <div style={{ marginLeft: "90%" }}><i className="btn-delete fas fa-trash-alt"></i></div>
                                        </div>
                                    )
                                }):""}
                            </div> */}
                        </div>
                        {/* // */}
                        {/* <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >Phone Number</label>

                            <div className="two fields">
                                <div className="field">
                                    <input type="tel" name="phoneNumber" pattern="[0]{1}[5]{1}[0-9]{8}" title="Should start with 05 and contain 10 digits" required placeholder="" onChange={addNewTaskHandler} />
                                </div>
                            </div>
                        </div> */}
                        {/* // */}
                        {/* <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >Address</label>

                            <div className="two fields">
                                <div className="field">
                                    <input type="text" name="address" required placeholder="" onChange={addNewTaskHandler} />
                                </div>
                            </div>
                        </div> */}
                        {/* // */}
                        <hr />
                        <div style={{ textAlign: "center", marginTop: "1rem", width: "100%" }}>
                            <button type="submit" style={{ width: "60%" }} className="btn btn-info" >Add</button>
                        </div>
                    </div>
                </form>
            </div>
            {/* <PopupSave type={"post"} trigger={buttonPopup.bool} setTrigger={setButtonPopup} addNewEmployeeST={addNewEmployeeST}>
                <i style={{ fontSize: "50px" }} className="fa fa-save" aria-hidden="true"></i>
                <h3>Save changes?</h3>
                <h6>Your unsaved changes will be lost.</h6>
                <h6>Save New Employee <span style={{ fontWeight: "bold" }}>{addNewEmployeeST.id}-{addNewEmployeeST.fullName}</span> changes before closing?</h6>
            </PopupSave> */}
        </div>
    )
}

export default AddTasks