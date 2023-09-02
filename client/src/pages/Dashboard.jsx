import React, { useEffect, useState } from "react";
import axios from "axios";
// import axiosInstance from '../hooks/useAxiosPrivate';
import { baseURL } from '../utils/constants';

axios.defaults.withCredentials = true;

const Dashboard = () => {
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${baseURL}/users`, {
        withCredentials: true,
      });
      const data = res.data;
      return data;
    } catch (err) {
      setError("An error occurred while fetching user data.");
      throw err;
    }
  };

  useEffect(() => {
    sendRequest()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <button onClick={sendRequest}>Show Users</button>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;