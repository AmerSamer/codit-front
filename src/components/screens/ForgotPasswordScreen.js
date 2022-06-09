import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";
import { useNavigate } from "react-router-dom";
const port = "https://codit-back.herokuapp.com"
const portLocal = "http://localhost:4001"

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${port}/api/auth/forgotpassword`,
        { email },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const back = () => {
    navigate('/login');
  }
  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <button type="button" className="btn btn-dark" onClick={back}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <label style={{ fontFamily: "revert", fontWeight: "bold", color: "white" }} htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            style={{ marginBottom: "1.5rem" }}
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;