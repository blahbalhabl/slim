import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import '../styles/Signup.css'

const Signup = () => {
  const axiosPrivate = useAxiosPrivate();
  const [password, setPassword] = useState();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    role: "",
    level: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send Request to Server API
    userSignup();
  };

  const userSignup = async () => {
    try {
      const userData = {
        email: inputs.email,
        username: inputs.username,
        role: inputs.role,
        level: inputs.level,
      };

      const res = await axiosPrivate.post('/signup', userData, {
        headers: {'Content-Type': 'application/json'}
      });

      if (res.status === 200) {
        const defaultPassword = res.data.defaultPassword;
        setPassword(defaultPassword);
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  // Use useEffect to send the email after the password state has been updated
  useEffect(() => {
    if (password) {
      const emailData = {
        email: inputs.email,
        subject: `SLIM Account Creation`,
        text: `
          <h1>Welcome to SLIM.</h1> 
          <h3>Here are your account details:</h3>
          </br>
          </br>
          <p>email: ${inputs.email}</p>
          <p>password: ${password}</p>
          <p>Make sure once logged in to change password right away.</p>`,
      };
      
      axiosPrivate.post('/send-email', emailData, {
        headers: {'Content-Type': 'application/json'}
      }).catch((err) => {
        console.log('Error sending email:', err);
      });
    }
  }, [password, inputs.email, axiosPrivate]);

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit}> 
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
            type="text"
            name="role"
            value={inputs.role}
            onChange={handleChange}
            placeholder="Role"
            required 
            />
            <input 
            type="text"
            name="level"
            value={inputs.level}
            onChange={handleChange}
            placeholder="Level: LGU : DILG : BARANGAY"
            required 
            />
            <button className="Signup__Button"
              type="submit" 
              > Create User
            </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
