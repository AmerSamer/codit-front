import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import Employees from './components/pages/Employees';
import Tasks from './components/pages/Tasks';
import AddEmployees from './components/pages/AddEmployees';
import UpdateEmployee from './components/pages/UpdateEmployee';
import AddTasks from './components/pages/AddTasks';
import EmployeeTasks from './components/pages/EmployeeTasks';
import UpdateTask from './components/pages/UpdateTask';

const App = () => {
  return (
    <Router>
      <Fragment>
        <div className="app">
          <Routes>
            <Route path='/' element={<PrivateRoute />}/>
            <Route path='/dashboard' element={<PrivateScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route
              path="/forgotpassword"
              element={<ForgotPasswordScreen />}
            />
            <Route
              path="/passwordreset/:resetToken"
              element={<ResetPasswordScreen />} 
            />
           <Route path="/employees" element={<Employees />} />
           <Route path="/addEmployees" element={<AddEmployees />} />
           <Route path="/updateEmployee" element={<UpdateEmployee />} />
           <Route path="/tasks" element={<Tasks />} />
           <Route path="/addTasks" element={<AddTasks />} />
           <Route path="/updateTask" element={<UpdateTask />} />
           <Route path="/employeeTasks" element={<EmployeeTasks />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;