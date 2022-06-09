import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordScreen.css";
const port = "https://codit-back.herokuapp.com"
const portLocal = "http://localhost:4001"

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {resetToken} = useParams();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `${port}/api/auth/passwordreset/${resetToken}`,
        {
          password,
        },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="resetpassword-screen">
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen__form"
      >
        <h3 className="resetpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <div className="form-group">
          <label style={{fontFamily:"revert", fontWeight:"bold", color: "white"}} htmlFor="password">New Password</label>
          <input
            type="password"
            required
            id="password"
            placeholder=""
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{fontFamily:"revert", fontWeight:"bold", color: "white"}} htmlFor="confirmpassword">Confirm New Password</label>
          <input
            type="password"
            required
            id="confirmpassword"
            style={{marginBottom:"1.5rem"}}
            placeholder=""
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;