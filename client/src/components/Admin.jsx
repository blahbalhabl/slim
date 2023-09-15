import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

import '../styles/Admin.css'

const Users = () => {

  const { auth } = useAuth();
  const [users, setUser] = useState();
  const [ordinances, setOrdinances] = useState();
  const [pending, setPending] = useState();
  const [vetoed, setVetoed] = useState();
  const [approved, setApproved] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const sendRequest = async () => {
    try {
      const usersRes = await axiosPrivate.get('/users');
      const ordinanceRes = await axiosPrivate.get(`/count-ordinances?level=${auth.level}`);
      return { 
        users: usersRes.data, 
        ordinances: ordinanceRes.data,
      };
    } catch (err) {
      setError("An error occurred while fetching data.");
      throw err;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    sendRequest()
      .then(({
        users, 
        ordinances,
      }) => { 
        if ( isMounted ) {
          setUser(users);
          setOrdinances(ordinances.all);
          setPending(ordinances.pending);
          setVetoed(ordinances.vetoed);
          setApproved(ordinances.approved);
        }
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
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="Admin">
      <div className="Admin__Container">
        <div className="Admin__Card">
          <p>Number of Users:</p>
          <p>{ users.length }</p>
        </div>
        <div className="Admin__Card">
          <p>Number of Ordinances</p>
          <p>{ ordinances }</p>
        </div>
        <div className="Admin__Card">
          <p>Total Pending Ordinances</p>
          <p>{ pending }</p>
        </div>
        <div className="Admin__Card">
          <p>Total Vetoed Ordinances</p>
          <p>{ vetoed }</p>
        </div>
        <div className="Admin__Card">
          <p>Total Approved Ordinances</p>
          <p>{ approved }</p>
        </div>
      </div>
    </div>
  );
};

export default Users