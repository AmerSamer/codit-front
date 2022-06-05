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
           <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;