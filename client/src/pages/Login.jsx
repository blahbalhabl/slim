import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Login = () => {
  const { 
    userLogin, 
    handleChange, 
    persist, 
    setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

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
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginX="auto"
          width={300}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4">Login</Typography>
          <TextField
            name="email"
            onChange={handleChange}
            type="email"
            variant="outlined"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            variant="outlined"
            placeholder="Password"
            margin="normal"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
          <div className="Login__Remember">
            <input 
              type="checkbox"
              id="remember"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Trust This Device</label>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Login;
