import React from "react";
import axios from "axios";
import { Navigate, useNavigate,/* Link */ } from "react-router-dom";
import Nav from "../nav/nav";
import "./employees.css";
import PopupRemoveTask from "./PopupRemoveTask";
const portLocal = "http://localhost:4001"

const Tasks = () => {
  const navigate = useNavigate()
  const [error, setError] = React.useState("");
  const [privateData, setPrivateData] = React.useState({ admin: true });
  const [allTasks, setAllTasks] = React.useState([]);
  const [allEmployees, setAllEmployees] = React.useState([{ id: "s" }, { id: "s" }, { id: "s" }, { id: "s" }, { id: "s" }, { id: "s" }, { id: "s" }, { id: "s" }]);
  const [buttonPopup, setButtonPopup] = React.useState([{
    bool: false,
    idTask: null,
    id: null,
    name: null
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
        if (data.user.admin) {
          setPrivateData(data.user);
          getAllTasks() //axios get getAllTasks after setting token
          getAllEmployees() //axios get getAllEmployees after setting token
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

  }, [allTasks]);
  const getAllTasks = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
      },
    };
    const response = await axios.get(`${portLocal}/v1/getAllTasks/`, config);
    setAllTasks(response.data);

  }
  const getAllEmployees = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
      },
    };
    const response = await axios.get(`${portLocal}/v1/getAllEmployees/`, config);
    setAllEmployees(response.data);

  }
  const addTasksClickBtn = () => {
    navigate('/addTasks', { state: [allTasks, allEmployees] })
  }
  const trTaskHandler = (id) => {
    const selectedTask = allTasks.find(emp => emp._id === id)
    navigate('/updateTask', { state: [allTasks, selectedTask] })
  }
  const employeeNamesAssigned = (tsk) => {
    const result = allEmployees.filter((cert) => {
      let arr = tsk.assign.filter((detail) => detail.id === cert._id);
      return !(arr.length === 0);
    });
    // console.log(result);
    return result;
  };
  const calcTime = (startDate, endDate) => {
    // console.log(startDate);
    if (startDate && !endDate) {
      const date1 = new Date(startDate);
      const date2 = new Date();
      let diffTime = 0
      if (Math.abs(date2 - (date1)) / 3.6e+6 < 1) {
        diffTime = Math.abs(date2 - date1) / 60000;
        return "(" + diffTime.toFixed(0) + "mins (still working))"
      } else {
        diffTime = Math.abs(date2 - date1) / 3.6e+6;
        return "(" + diffTime.toFixed(1) + "hours (still working))"
      }
    } else if (startDate && endDate) {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
      let diffTime = 0
      if (Math.abs(date2 - (date1)) / 3.6e+6 < 1) {
        diffTime = Math.abs(date2 - date1) / 60000;
        return "(" + diffTime.toFixed(0) + "mins (done))"
      } else {
        diffTime = Math.abs(date2 - date1) / 3.6e+6;
        return "(" + diffTime.toFixed(1) + "hours (done))"
      }
    } else {
      return "(0mins (didn't start))"
    }

  }
  return error ? (
    <Navigate to="/login" />
  ) : (
    <div className="employees">
      <Nav />
      <div className='container'>
        <div className="container_content">
          <div className="container_content_inner">
            <div className="title">
              <h1>Tasks</h1>
            </div>
            <div className="btns">
              <button className='btns_add' onClick={addTasksClickBtn}>Add Task</button>
            </div>
            <div className="par">
              {allTasks.length === 0 ? (
                <></>
              ) : (
                <div >
                  <table id="employees_table_data">
                    <thead>
                    </thead>
                    <tbody>
                      {allTasks.length > 0 ? allTasks.map((tsk, index) => {
                        return (<tr key={index} >
                          <td onClick={() => trTaskHandler(tsk._id)}>{tsk.id}</td>
                          <td onClick={() => trTaskHandler(tsk._id)}>{tsk.name}</td>
                          <td onClick={() => trTaskHandler(tsk._id)}>{tsk.createdDate}</td>
                          <td onClick={() => trTaskHandler(tsk._id)}>{employeeNamesAssigned(tsk).map((i, index) => (
                            <div key={index}>- {i.fullName} {tsk.assign.map(x => <span style={{ color: "rgba(255,255,255,0.7)" }}>{x.id === i._id ? calcTime(x.startDate, x.endDate) : ""}</span>)} </div>
                          ))}</td>
                          <td onClick={() => trTaskHandler(tsk._id)}>{tsk.status}</td>
                          <td style={{ width: "6rem" }}><i className="btn-delete fas fa-trash-alt" onClick={() => setButtonPopup({ bool: true, idTask: tsk.id, id: tsk._id, name: tsk.name })}></i></td>
                        </tr>)
                      }) : <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                        <div style={{ fontSize: "160%", fontFamily: "sans-serif" }}>No Tasks Found.</div>
                      </div>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="overlay"></div>
      <PopupRemoveTask id={buttonPopup.id} trigger={buttonPopup.bool} setTrigger={setButtonPopup} allTasks={allTasks} setAllTasks={setAllTasks}>
        <i style={{ fontSize: "50px" }} className="fa fa-trash" aria-hidden="true"></i>
        <h3>Delete Permanently</h3>
        <h6>Are you sure you want to delete <span style={{ fontWeight: "bold" }}>{buttonPopup.idTask}-{buttonPopup.name}</span> Task?</h6>
      </PopupRemoveTask>
    </div>
  )
}

export default Tasks