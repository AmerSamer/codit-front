import React from "react";
import axios from "axios";
import './Popup.css'
const port = "https://codit-back.herokuapp.com"
const portLocal = "http://localhost:4001"

const PopupRemove = (props) => {

    const deleteHandler = (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
            },
        };

        axios.delete(`${port}/v1/deleteEmployee/${id}`, config)
            .then((res) => {
                if (res.status === 200) {
                    props.setTrigger(false)
                    const arr = props.allEmployees.filter(emp => emp._id === res.data._id)
                    props.setAllEmployees(arr);
                }
                else {
                    alert("Something went wrong")
                }
            }).catch((err) => {
                alert("error")
            })
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {props.children}
                <button type="button" className="close-btn btn btn-secondary" onClick={() => props.setTrigger(false)}>Cancel</button>
                <button type="button" className="delete-btn btn btn-danger" onClick={() => deleteHandler(props.id)}>Delete</button>
            </div>
        </div>
    ) : ""
}

export default PopupRemove 