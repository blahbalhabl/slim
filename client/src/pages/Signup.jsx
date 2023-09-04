import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Send Request to Backend API then navigate to Login
    userSignup().then(() => navigate("/login"));
  };

  const userSignup = async () => {
    const userData = {
      email: inputs.email,
      username: inputs.username,
      password: inputs.password,
      role: inputs.role,
    };
    const res = await axios.post('/signup', userData).catch((err) => {
      console.log(err);
    });
    const data = await res.data;
    return data;
  };

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
          <Typography variant="h4">Signup</Typography>
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            variant="outlined"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="username"
            onChange={handleChange}
            value={inputs.username}
            variant="outlined"
            placeholder="Username"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            variant="outlined"
            placeholder="Password"
            margin="normal"
          />
          <TextField
            name="role"
            onChange={handleChange}
            value={inputs.role}
            variant="outlined"
            placeholder="Role"
            margin="normal"
          />
          <Button variant="contained" type="submit">
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
