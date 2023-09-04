import axios from "../api/axios";
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({});
  const [refresh, setRefresh] = useState({});
  const [user, setUser] = useState(() =>
    JSON.parse(sessionStorage.getItem("user") || null)
  );
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const userLogin = async (e) => {
    const userData = {
      email: inputs.email,
      password: inputs.password,
    };
    try {
      const res = await axios.post('/login', userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.data;
        setAuth(data.token);
        setRefresh(data.refresh);
        setUser(jwt_decode(data.token));
        console.log('Login Success');
        return data;
      } else {
        console.log("Login failed", res.statusText);
      }
    } catch (err) {
      console.log("Error during login", err);
    }
  };
  // Save user to session storage for persistent login
  sessionStorage.setItem("user", JSON.stringify(user));
  
  const userLogout = () => {
    setUser(null);
    setAuth(null);
    setRefresh(null);
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const contextData = {
    userLogin: userLogin,
    handleChange: handleChange,
    userLogout: userLogout,
    setUser:setUser,
    setAuth:setAuth,
    user: user,
    auth: auth,
    refresh: refresh,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
