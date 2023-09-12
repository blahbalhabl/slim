import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import '../styles/Signup.css'

const Signup = () => {
  const axiosPrivate = useAxiosPrivate();
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
    userSignup();
  };

  const userSignup = async () => {
    try {
      const userData = {
        email: inputs.email,
        username: inputs.username,
        password: inputs.password,
        role: inputs.role,
      };
      const res = await axiosPrivate.post('/signup', userData )
      const data = await res.data;
      return data;
    } catch (err) {
      console.log('Error:', err);
    }
    
  };

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit} encType="multipart/form-data"> 
        <div className="Signup__Container">
          <h4>Signup</h4>
          <input 
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Email" 
            required
            />
            <input 
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            placeholder="Username"
            required
            />
            <input 
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            required
            />
            <input 
            type="text"
            name="role"
            value={inputs.role}
            onChange={handleChange}
            placeholder="Role"
            required 
            />
            <button className="Signup__Button"
              type="submit" 
              > Signup 
            </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
