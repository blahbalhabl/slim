import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import '../styles/Login.css'

const Login = () => {
  const [visible, setVisible] = useState(false);

  const inputType = visible ? "text" : "password";
  const toggleIcon = visible ? "hide" : "show";

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
  }

  useEffect(() => {
    localStorage.setItem('persist', persist);
  },[persist]);

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="Login__Container">
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
            {loginError && <p className="Login__Error__Message">{loginError}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
