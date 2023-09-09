import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const sendRequest = async () => {
    try {
      const res = await axiosPrivate.get('/users');
      const data = res.data;
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
      <p>Number of Users:</p>
      <p>{ users }</p>
    </div>
  );
};

export default Users