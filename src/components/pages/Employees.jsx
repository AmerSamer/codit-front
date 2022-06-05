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
          // getAllOrders() //axios get getAllOrders after setting token 
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

  const addEmployeesClickBtn = () => {
    navigate('/addEmployees', { state: [] })
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
              <table id="stationsdata">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Join Date</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Samer Amer</td>
                    <td>s@s.com</td>
                    <td>0546548771</td>
                    <td>Aba Hoshe 199, Haifa</td>
                    <td>10/4/2022</td>
                    <td>Junior Developer</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Samer Amer</td>
                    <td>s@s.com</td>
                    <td>0546548771</td>
                    <td>Aba Hoshe 199, Haifa</td>
                    <td>10/4/2022</td>
                    <td>Junior Developer</td>
                  </tr><tr>
                    <td>1</td>
                    <td>Samer Amer</td>
                    <td>s@s.com</td>
                    <td>0546548771</td>
                    <td>Aba Hoshe 199, Haifa</td>
                    <td>10/4/2022</td>
                    <td>Junior Developer</td>
                  </tr><tr>
                    <td>1</td>
                    <td>Samer Amer</td>
                    <td>s@s.com</td>
                    <td>0546548771</td>
                    <td>Aba Hoshe 199, Haifa</td>
                    <td>10/4/2022</td>
                    <td>Junior Developer</td>
                  </tr><tr>
                    <td>1</td>
                    <td>Samer Amer</td>
                    <td>s@s.com</td>
                    <td>0546548771</td>
                    <td>Aba Hoshe 199, Haifa</td>
                    <td>10/4/2022</td>
                    <td>Junior Developer</td>
                  </tr><tr>
                    <td>1</td>
                    <td>Samer Amer</td>
                    <td>s@s.com</td>
                    <td>0546548771</td>
                    <td>Aba Hoshe 199, Haifa</td>
                    <td>10/4/2022</td>
                    <td>Junior Developer</td>
                  </tr><tr>
                    <td>1</td>
                    <td>Samer Amer</td>
                    <td>s@s.com</td>
                    <td>0546548771</td>
                    <td>Aba Hoshe 199, Haifa</td>
                    <td>10/4/2022</td>
                    <td>Junior Developer</td>
                  </tr><tr>
                    <td>1</td>
                    <td>Samer Amer</td>
                    <td>s@s.com</td>
                    <td>0546548771</td>
                    <td>Aba Hoshe 199, Haifa</td>
                    <td>10/4/2022</td>
                    <td>Junior Developer</td>
                  </tr><tr>
                    <td>1</td>
                    <td>Samer Amer</td>
                    <td>s@s.com</td>
                    <td>0546548771</td>
                    <td>Aba Hoshe 199, Haifa</td>
                    <td>10/4/2022</td>
                    <td>Junior Developer</td>
                  </tr><tr>
                    <td>1</td>
                    <td>Samer Amer</td>
                    <td>s@s.com</td>
                    <td>0546548771</td>
                    <td>Aba Hoshe 199, Haifa</td>
                    <td>10/4/2022</td>
                    <td>Junior Developer</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Feras Amer</td>
                    <td>f@f.com</td>
                    <td>0541234567</td>
                    <td>Hashaloum 15, Tlv</td>
                    <td>17/8/2022</td>
                    <td>Senior Developer</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
      <div className="overlay"></div>
    </div>
  )
}

export default Employees