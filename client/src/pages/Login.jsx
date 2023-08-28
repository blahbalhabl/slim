import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import axios from 'axios'
import { baseURL } from '../utils/constants'
import { useNavigate } from "react-router-dom"

const Login = () => {
    
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => {
          return { ...prev, [name]: value }
        });
        console.log(inputs)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Send Request to Backend API then navigate to Login
        userLogin().then(() => navigate('/dashboard'));
    }

    const userLogin = async () => {
        const userData = {
            email: inputs.email,
            password: inputs.password,
        }
        try {
            const res = await axios
            .post(`${baseURL}/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            if (res.status === 200) {
                const data = await res.data;
                return data;
            } else {
                console.log('Login failed', res.statusText);
            }
        } catch (err) {
            console.log('Error during login', err);
        }
        
        
        
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
                <TextField name="email" onChange={handleChange} value={inputs.email} type="email" variant='outlined' placeholder="Email" margin="normal" />
                <TextField name="password" onChange={handleChange} value={inputs.password} type="password" variant='outlined' placeholder="Password" margin="normal"/>
                <Button variant="contained" type="submit">Login</Button>
            </Box>
        </form>
    </div>
  )
}

export default Login