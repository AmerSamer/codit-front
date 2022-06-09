import React from "react";
import axios from "axios";
import { Navigate, useNavigate,/* Link */ } from "react-router-dom";
import './Popup.css'
const port = "https://codit-back.herokuapp.com"
const portLocal = "http://localhost:4001"

const PopupSave = (props) => {
    const navigate = useNavigate();

    const saveHandler = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
            },
        };
        if (props.type === "post") {
            axios.post(`${port}/v1/newEmployee`, props.addNewEmployeeST, config)
                .then((res) => {
                    if (res.status === 200) {
                        navigate('/employees')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }).catch((err) => {
                    alert(`ERROR`)
                })
        } else {
            axios.put(`${port}/v1/updateEmployee/${props.selectedEmployeeST._id}`, props.addNewEmployeeST, config)
                .then((res) => {
                    if (res.status === 200) {
                        navigate('/employees')
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

export default PopupSave