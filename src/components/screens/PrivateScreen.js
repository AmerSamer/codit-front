import React from 'react';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import Nav from '../nav/nav';
import NavNotAdmin from "../nav/navNotAdmin";
import '../nav/nav.css'
import './PrivateScreen.css'
const portLocal = "http://localhost:4001"

const PrivateScreen = () => {
    const navigate = useNavigate();
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
                setPrivateData(data.user);
                // getAllOrders() //axios get getAllOrders after setting token
            } catch (error) {
                localStorage.removeItem("authTokenCodit");
                setError("You are not authorized please login");
            }
        };

        fetchPrivateDate();

    }, []);

    return error ? (
        <Navigate to="/login" />
    ) : (
        <div id='dashboard'>
            {privateData.admin ? <Nav /> : <NavNotAdmin />}
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div><div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
            <div>Home/Dashboard/ProvateScreen</div>
           
        </div>
    )
}
export default PrivateScreen;