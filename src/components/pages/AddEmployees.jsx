import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import './addEmployees.css'
import PopupSave from "./PupupSave";
// import PopupAddOrder from "./PopupAddOrder";
// const port = "https://carpentry-production-back.herokuapp.com"
const portLocal = "http://localhost:4001"

const AddEmployees = ({ id, fullName, email, phoneNumber, address }) => {
    const navigate = useNavigate();
    const allEmployeesST = useLocation().state; //get allEmployees State from father component
    const [error, setError] = React.useState("");
    const [privateData, setPrivateData] = React.useState("");
    const [addNewEmployeeST, setAddNewEmployeeST] = React.useState({
        id: id,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        joinDate: (new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" + ((new Date().getDate()) < 10 ? "0" + (new Date().getDate()) : (new Date().getDate()))),
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
                const { data } = await axios.get(`${portLocal}/api/private`, config);
                if (allEmployeesST && data.user.admin) {
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

    const addNewEmployeeHandler = (e) => {
        setAddNewEmployeeST({
            ...addNewEmployeeST,
            [e.target.name]: (e.target.value)
        })
    }

    const backToOrdersClickBtn = () => {
        navigate('/employees')
    }
    const submitNewEmployeeHandler = (event) => {
        event.preventDefault();
        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
        //     },
        // };
        const idExist = allEmployeesST.find(emp => emp.id === addNewEmployeeST.id)
        if (!idExist) {
            setButtonPopup({ bool: true })
            // axios.post(`${portLocal}/v1/newEmployee`, addNewEmployeeST, config)
            //     .then((res) => {
            //         if (res.status === 200) {
            //             navigate('/employees')
            //         }
            //         else {
            //             alert("Something went wrong")
            //         }
            //     }).catch((err) => {
            //         alert(`ERROR`)
            //     })
        } else {
            alert(`This ID number is already exist.`)
        }

    }

    return error ? (
        <Navigate to="/login" />
    ) : (
        <div id="add_employee">
            <div className="add_employee_form">
                <form onSubmit={submitNewEmployeeHandler} >
                    <div /*style={{ padding: "1rem", marginTop: "1rem" }}*/>
                        <button type="button" className="btn btn-secondary" onClick={backToOrdersClickBtn}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    </div>
                    {/* <hr /> */}
                    <div style={{ letterSpacing: "7px", textAlign: "center", padding: "1rem", fontSize: '23px', marginTop: "0rem" }}>
                        Add Employee
                    </div>
                    <div className="form-group" style={{ width: "100%", overflow: "hidden" }}>
                        <h4 className="ui dividing header" style={{ marginTop: "1rem" }}>Employee Details</h4>
                        {/* // */}
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >ID</label>
                            <div className="two fields">
                                <div className="field">
                                    <input type="text" name="id" pattern="[0-9]{9}" title="Should contain 9 Digits" required placeholder="" onChange={addNewEmployeeHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >Full Name</label>
                            <div className="two fields">
                                <div className="field">
                                    <input type="text" name="fullName" pattern="[a-z]{1,}[ ]{0,1}[a-z]{0,}" title="Should contain only lowercase letters (example example)" required placeholder="" onChange={addNewEmployeeHandler} />
                                </div>
                            </div>
                        </div>
                        {/* // */}
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >Email</label>

                            <div className="two fields">
                                <div className="field">
                                    <input type="text" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="example@example.exp" required placeholder="" onChange={addNewEmployeeHandler} />
                                </div>
                            </div>
                        </div>
                        {/* // */}
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >Phone Number</label>

                            <div className="two fields">
                                <div className="field">
                                    <input type="tel" name="phoneNumber" pattern="[0]{1}[5]{1}[0-9]{8}" title="Should start with 05 and contain 10 digits" required placeholder="" onChange={addNewEmployeeHandler} />
                                </div>
                            </div>
                        </div>
                        {/* // */}
                        <div className="field">
                            <label style={{ fontFamily: "revert", fontWeight: "600", color: "black", padding: "0%", fontSize: "100%" }} >Address</label>

                            <div className="two fields">
                                <div className="field">
                                    <input type="text" name="address" required placeholder="" onChange={addNewEmployeeHandler} />
                                </div>
                            </div>
                        </div>
                        {/* // */}
                        <hr />
                        <div style={{ textAlign: "center", marginTop: "1rem", width: "100%" }}>
                            <button type="submit" style={{ width: "60%" }} className="btn btn-info" >Add</button>
                        </div>
                    </div>
                </form>
            </div>
            <PopupSave type={"post"} trigger={buttonPopup.bool} setTrigger={setButtonPopup} addNewEmployeeST={addNewEmployeeST}>
                <i style={{ fontSize: "50px" }} className="fa fa-save" aria-hidden="true"></i>
                <h3>Save changes?</h3>
                <h6>Your unsaved changes will be lost.</h6>
                <h6>Save New Employee <span style={{ fontWeight: "bold" }}>{addNewEmployeeST.id}-{addNewEmployeeST.fullName}</span> changes before closing?</h6>
            </PopupSave>
        </div>
    )
}

export default AddEmployees