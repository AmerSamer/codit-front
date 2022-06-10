import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import './addEmployees.css'
import PopupSaveTask from "./PupupSaveTask";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const port = "https://codit-back.herokuapp.com"
const portLocal = "http://localhost:4001"

const UpdateTask = ({ id, name }) => {
    const navigate = useNavigate();
    const allTasksST = useLocation().state[0]; //get allTasks State from father component
    const selectedTaskST = useLocation().state[1]; //get selectedTask State from father component 
    const allEmployeesST = useLocation().state[2]; //get allEmployees State from father component
    const [error, setError] = React.useState("");
    const [privateData, setPrivateData] = React.useState("");
    const [newEmployeesAssigned, setNewEmployeesAssigned] = React.useState(selectedTaskST.assign)
    const [addNewTaskST, setAddNewTaskST] = React.useState({
        id: id,
        name: name
    });
    const [buttonPopup, setButtonPopup] = React.useState([{
        bool: false,
    }])
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
                if (allTasksST && selectedTaskST && data.user.admin) {
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

    const addNewTaskHandler = (e) => {
        if (e.target.value === "") {
            setAddNewTaskST({
                ...addNewTaskST,
                [e.target.name]: undefined
            })
        } else {
            setAddNewTaskST({
                ...addNewTaskST,
                [e.target.name]: (e.target.value)
            })
        }
    }

    const backToTasksClickBtn = () => {
        navigate('/tasks')
    }
    const submitNewTaskHandler = (event) => {
        event.preventDefault();
        const idExist = allTasksST.find(tsk => tsk.id === addNewTaskST.id)
        if (!idExist) {
            setButtonPopup({ bool: true })
        } else {
            alert(`This ID number is already exist.`)
        }
    }
    const employeeNamesAssigned = (tsk) => {
        const result = allEmployeesST.filter((cert) => cert._id === tsk.id);
        return result;
    };
    const addEmployeeAssigned = (id) => {
        const isExistEmployee = newEmployeesAssigned.find(i => i.id === id)
        if (!isExistEmployee) {
            setNewEmployeesAssigned(r => {
                return [
                    ...r,
                    {
                        id: id,
                        start: false,
                        end: false,
                        startDate: null,
                        endDate: null
                    }
                ]
            })
        } else {
            notify(`This employee is already exist.`)
        }
    }
    const deleteEmployeeAssigned = (id) => {
        const index = newEmployeesAssigned.findIndex(object => {
            return object.id === id;
        });
        if (index > -1) {
            newEmployeesAssigned.splice(index, 1)
            setNewEmployeesAssigned(r => {
                return [...r]
            })
        }
    }
    const notify = (ms) => toast(ms);

    return error ? (
        <Navigate to="/login" />
    ) : (
        <div id="add_employee">
            <div className="add_employee_form">
                <form onSubmit={submitNewTaskHandler} >
                    <div>
                        <button type="button" className="btn btn-secondary" onClick={backToTasksClickBtn}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    </div>
                    <div style={{ letterSpacing: "7px", textAlign: "center", padding: "1rem", fontSize: '23px', marginTop: "0rem" }}>
                        Update Task
                    </div>
                    <div className="form-group" style={{ width: "100%", overflow: "hidden" }}>
                        <h4 className="ui dividing header" style={{ marginTop: "1rem" }}>Task Details</h4>
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >ID</label>
                            <div className="two fields">
                                <div className="field">
                                    <input type="text" name="id" pattern="[0-9]{1,}" title="Should contain one or more digits" placeholder={selectedTaskST.id} onChange={addNewTaskHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >Name</label>
                            <div className="two fields">
                                <div className="field">
                                    <input type="text" name="name" pattern="[a-z]{1,}[0-9]{0,}" title="Should contain only lowercase letters and numbers" placeholder={selectedTaskST.name} onChange={addNewTaskHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <hr />
                            <label style={{ fontFamily: "revert", fontWeight: "500", color: "black", padding: "0%", fontSize: "80%" }} >*Assigned Employees</label>
                            <div className="two fields">
                                <div className="field">
                                    {newEmployeesAssigned.map((tsk, index) => {
                                        return (
                                            <div key={index}>{employeeNamesAssigned(tsk).map((i, indexx) => (
                                                <div className="selected-emp-map" key={indexx}>
                                                    <div style={{ float: "left", overflow: "hidden", width: "90%" }}>{i.id}-{i.fullName} </div>
                                                    <div style={{ width: "10%", overflow: "hidden" }}><i className="btn-delete fas fa-trash-alt" onClick={() => deleteEmployeeAssigned(i._id)}></i></div>
                                                </div>
                                            ))}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "500", color: "black", padding: "0%", fontSize: "80%" }} >*All Employees</label>
                            <div className="two fields">
                                <div className="field">
                                    {allEmployeesST.map((emp, index) => {
                                        return (
                                            <div className="selected-emp-map" key={index} onClick={() => addEmployeeAssigned(emp._id)}>{emp.id}-{emp.fullName}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div style={{ textAlign: "center", marginTop: "1rem", width: "100%" }}>
                            <button type="submit" style={{ width: "60%" }} className="btn btn-info" >update</button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
            <PopupSaveTask type={"put"} trigger={buttonPopup.bool} setTrigger={setButtonPopup} selectedTaskST={selectedTaskST} addNewTaskST={addNewTaskST} newEmployeesAssigned={newEmployeesAssigned}>
                <i style={{ fontSize: "50px" }} className="fa fa-save" aria-hidden="true"></i>
                <h3>Save changes?</h3>
                <h6>Your unsaved changes will be lost.</h6>
                <h6>Save Task`s Updates <span style={{ fontWeight: "bold" }}>{selectedTaskST.id}-{selectedTaskST.name}</span> changes before closing?</h6>
            </PopupSaveTask>
        </div>
    )
}

export default UpdateTask