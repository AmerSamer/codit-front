import React from "react";
import axios from "axios";

import { Navigate, useNavigate,/* Link */ } from "react-router-dom";
import Nav from "../nav/nav";
import "./employees.css";
const portLocal = "http://localhost:4001"

const Employees = () => {
  const navigate = useNavigate()
  const [error, setError] = React.useState("");
  const [privateData, setPrivateData] = React.useState({ admin: true });
  const [allEmployees, setAllEmployees] = React.useState(["a"]);

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
          getAllEmployees() //axios get getAllOrders after setting token 
        } else {
          console.log("else");
          localStorage.removeItem("authTokenCodit");
          setError("You are not authorized please login");
        }
      } catch (error) {
        console.log("catch");
        localStorage.removeItem("authTokenCodit");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();

  }, [allEmployees]);
  const getAllEmployees = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
      },
    };
    const response = await axios.get(`${portLocal}/v1/getAllEmployees/`, config);
    // const responseDataSortNewDate = response.data.sort((a, b) => (!a.delivered && !b.delivered) || (a.delivered && b.delivered) ? a.deliveryDate > b.deliveryDate ? 1 : -1 : a.delivered && !b.delivered ? 1 : -1)
    setAllEmployees(response.data);
  }
  const addEmployeesClickBtn = () => {
    navigate('/addEmployees', { state: allEmployees })
  }
  const deleteEmployee = (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authTokenCodit")}`,
      },
    };
    axios.delete(`${portLocal}/v1/deleteEmployee/${id}`, config)
      .then((res) => {
        if (res.status === 200) {
          const arr = allEmployees.filter(emp => emp._id === res.data._id)
          setAllEmployees(arr);
        }
        else {
          // notify('Something went wrong')
          alert("Something went wrong")
        }
      }).catch((err) => {
        // notify('ERROR')
        alert("error")
      })
  }
  const trEmployeeHandler = (id) => {
    // console.log(id);
    const selectedEmployee = allEmployees.find(emp=>emp._id===id)
    navigate('/updateEmployee', { state: [allEmployees,selectedEmployee] })
  }
  return error ? (
    <Navigate to="/login" />
  ) : (
    <div className="s">
      <Nav />
      <div className='container'>
        <div className="container_content">
          <div className="container_content_inner">
            <div className="title">
              <h1>Employees</h1>
            </div>
            <div className="btns">
              <button className='btns_more' onClick={addEmployeesClickBtn}>Add Employee</button>
            </div>
            <div className="par">
              {allEmployees.length === 0 ? (
                <div style={{ textAlign: "center", height: "70vh", display: "flex", justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                  <div style={{ fontSize: "160%", fontFamily: "sans-serif" }}>No Employees Found.</div>
                </div>
              ) : (
                <table id="stationsdata">
                  <thead>
                    {/* <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>Join Date</th>
                      <th>More</th>
                    </tr> */}
                  </thead>
                  <tbody>
                    {allEmployees.map((emp, index) => {
                      return (<tr key={index} >
                        <td onClick={() => trEmployeeHandler(emp._id)}>{emp.id}</td>
                        <td onClick={() => trEmployeeHandler(emp._id)}>{emp.fullName}</td>
                        <td onClick={() => trEmployeeHandler(emp._id)}>{emp.email}</td>
                        <td onClick={() => trEmployeeHandler(emp._id)}>{emp.phoneNumber}</td>
                        <td onClick={() => trEmployeeHandler(emp._id)}>{emp.address}</td>
                        <td onClick={() => trEmployeeHandler(emp._id)}>{emp.joinDate}</td>
                        <td style={{ width: "6rem" }}><i className="btn-delete fas fa-trash-alt" onClick={() => deleteEmployee(emp._id)}></i></td>
                      </tr>)
                    })}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        </div>

      </div>
      <div className="overlay"></div>
    </div>
  )
}

export default Employees