import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from "../utils/Icons";
import axios from "../api/axios";
import '../styles/Login.css'

const Login = () => {
  const [otp, setOtp] = useState();
  const [visible, setVisible] = useState(false);
  const [loginError, setLoginError] = useState(); 
  const inputType = visible ? "text" : "password";
  const toggleIcon = visible ? <FontAwesomeIcon icon={icons.eye} /> : <FontAwesomeIcon icon={icons.eyeslash} />;

  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: inputs.email,
        password: inputs.password,
        otp: inputs.otp || null,
      };

      const res = await axios.post('/login', userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.data;

      if (res.status === 200) {
        setAuth(data);
        navigate(from, { replace: true });
        return data;
      } else if (res.status === 201) {
        setOtp(true);
      } else {
        console.log("Login failed", res.statusText);
      }

      if (otp) {
        // If otp returned as true
        const res = await axios.post('/verify', userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          const data = await res.data;
          setAuth(data);
          navigate(from, { replace: true });
          return data;
        }
      }
    } catch (err) {
      setLoginError("Incorrect Credentials!");
      console.log("Error during login", err);
    }
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  },[persist]);

  return (
    <div className="Login">
      
      <form onSubmit={userLogin}>
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
          { otp && (
            <input 
            type='text'
            name="otp"
            onChange={handleChange}
            placeholder="OTP" 
            required
          />
          )}
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
          <div>
            Forgot Password
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
