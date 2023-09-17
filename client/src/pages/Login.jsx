import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from "../utils/Icons";
import '../styles/Login.css'

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [forgot, setForgot] = useState();

  const inputType = visible ? "text" : "password";
  const toggleIcon = visible ? <FontAwesomeIcon icon={icons.eye} /> : <FontAwesomeIcon icon={icons.eyeslash} />;

  const { 
    userLogin, 
    handleChange, 
    persist, 
    setPersist,
    loginError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';
  // const [inputType, toggleIcon] = usePasswordToggle();

  const handleSubmit = (e) => {
    e.preventDefault();
    //Send Request to Backend API then navigate to Login
    userLogin()
    .then(() => navigate(from, { replace: true }));
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  };

  const forgotPassword = async () => {
    const res = await axios.get('/forgot-password', {
      headers: {'Content-Type': 'application/json'}
    });
    setForgot(res.data.auth);
  };

  useEffect(() => {
    if (password) {
      const emailData = {
        email: inputs.email,
        subject: `OTP Password Reset Request`,
        text: `
          <h1>Forgot Password?.</h1> 
          <h3>If you requested your password to be changed:</h3>
          </br>
          </br>
          <p>For email: ${inputs.email}</p>
          <h1>:${forgot}</h1>
          <p>Never share OTP codes to anyone.</p>`,
      };
      
      axiosPrivate.post('/send-email', emailData, {
        headers: {'Content-Type': 'application/json'}
      }).catch((err) => {
        console.log('Error sending email:', err);
      });
    }
  }, [password, inputs.email, axiosPrivate]);

  useEffect(() => {
    localStorage.setItem('persist', persist);
  },[persist]);

  return (
    <div className="Login">
      
      <form onSubmit={handleSubmit}>
        <div className="Login__Container">
        {loginError && <p className="Login__Error__Message">{loginError}</p>}
          <h4>Login</h4>
          <input 
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input 
            type={inputType}
            name="password"
            onChange={handleChange}
            placeholder="Password" 
            required
          />
          <span
            className="Login__Password__Toggle"
            onClick={() => setVisible(visible => !visible)}>
              {toggleIcon}
          </span>
          <br />
          <button
            className="Login__Button"
            type="submit" 
            > Login
          </button>
          <div className="Login__Remember">
            <input 
              type="checkbox"
              id="remember"
              onChange={togglePersist}
              checked={persist}
            />
            <label>Trust This Device</label>
          </div>
          <div onClick={forgotPassword}>
            Forgot Password
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
