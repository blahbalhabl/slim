import axios from "../api/axios";
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState();
  const [loginError, setLoginError] = useState(null);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist')) || false);
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
        setAuth(data);
        setLoginError(null);
        return data;
      } else {
        setLoginError("Login failed: " + res.statusText);
        console.log("Login failed", res.statusText);
      }
    } catch (err) {
      setLoginError("Incorrect Credentials!");
      console.log("Error during login", err);
    }
  };
  
  const contextData = {
    userLogin: userLogin,
    handleChange: handleChange,
    setAuth:setAuth,
    setPersist: setPersist,
    auth: auth,
    persist: persist,
    loginError: loginError,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
