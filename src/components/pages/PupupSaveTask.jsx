import React from "react";
import axios from "axios";
import { Navigate, useNavigate,/* Link */ } from "react-router-dom";
import './Popup.css'
const port = "https://codit-back.herokuapp.com"
const portLocal = "http://localhost:4001"

const PopupSaveTask = (props) => {
    const navigate = useNavigate();

    const saveHandler = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
            },
        };
        if (props.type === "post") {
            const newTask = {
                id: props.addNewTaskST.id,
                name: props.addNewTaskST.name,
                status: "waiting",
                assign: props.selectedAssignEmployees,
                createdDate: (new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" + ((new Date().getDate()) < 10 ? "0" + (new Date().getDate()) : (new Date().getDate()))),

            }
            axios.post(`${port}/v1/newTask`, newTask, config)
                .then((res) => {
                    if (res.status === 200) {
                        navigate('/tasks')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }).catch((err) => {
                    alert(`ERROR`)
                })
        } else {
            const newUpdatedTask = {
                id: props.addNewTaskST.id,
                name: props.addNewTaskST.name,
                // status: "waiting",
                assign: props.newEmployeesAssigned,
                // createdDate: (new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" + ((new Date().getDate()) < 10 ? "0" + (new Date().getDate()) : (new Date().getDate()))),

            }
            axios.put(`${port}/v1/updateTask/${props.selectedTaskST._id}`, newUpdatedTask, config)
                .then((res) => {
                    if (res.status === 200) {
                        navigate('/tasks')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }).catch((err) => {
                    alert(`ERROR`)
                })
        }

    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {props.children}
                <button type="button" className="close-btn btn btn-secondary" onClick={() => props.setTrigger(false)}>Cancel</button>
                <button type="button" className="delete-btn btn btn-info" onClick={() => saveHandler()}>Save</button>
            </div>
        </div>
    ) : ""
}

export default PopupSaveTask