import { Box, Button, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const Login = () => {
    const {userLogin, handleChange} = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //Send Request to Backend API then navigate to Login
        userLogin().then(() => navigate('/'));
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Box 
                marginX='auto' 
                width={300} 
                display='flex' 
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                <Typography variant="h4">Login</Typography>
                <TextField name="email" onChange={handleChange} type="email" variant='outlined' placeholder="Email" margin="normal" />
                <TextField name="password" onChange={handleChange} type="password" variant='outlined' placeholder="Password" margin="normal"/>
                <Button variant="contained" type="submit">Login</Button>
            </Box>
        </form>
    </div>
  )
}

export default Login