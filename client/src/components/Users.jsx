import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshTOken";

const Users = () => {
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  const sendRequest = async () => {
    try {
      const res = await axiosPrivate.get('/users');
      const data = res.data;
      console.log(res.data);
      return data;
    } catch (err) {
      setError("An error occurred while fetching user data.");
      throw err;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    sendRequest()
      .then((data) => {
        isMounted && setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

      return () => {
        isMounted = false;
        controller.abort();
      }
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
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};

export default Users