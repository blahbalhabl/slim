import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { roles } from "../utils/userRoles"

import '../styles/Admin.css'

const Users = () => {
  const role = roles.role;
  const level = roles.level;

  const { auth } = useAuth();
  const [users, setUser] = useState();
  const [ordinances, setOrdinances] = useState();
  // const [pending, setPending] = useState();
  // const [vetoed, setVetoed] = useState();
  // const [approved, setApproved] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const sendRequest = async () => {
    try {
      const usersRes = await axiosPrivate.get('/users');
      const ordinanceRes = await axiosPrivate.get(`/ordinances?level=${auth.level}`);
      return { 
        users: usersRes.data, 
        ordinances: ordinanceRes.data,
        // pending: pendingOrdinances,
        // vetoed: vetoedOrdinances,
        // approved: approvedOrdinances,
      };
    } catch (err) {
      setError("An error occurred while fetching data.");
      throw err;
    }
  };
  
  // const handleFileUpload = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const res = await axiosPrivate.post("/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("File uploaded successfully", res.data);
  //   } catch (err) {
  //     console.error('Error uploading file', error);
  //   }
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const fileInput = document.getElementById("file");
  //   if(fileInput.isDefaultNamespace.length === 1) {
  //     const file = fileInput.files[0];
  //     handleFileUpload(file);
  //   } else {
  //     console.log('No file Selected');
  //   }
  // }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    sendRequest()
      .then(({
        users, 
        ordinances,
        // pending,
        // vetoed,
        // approved,
      }) => { 
        if ( isMounted ) {
          setUser(users);
          setOrdinances(ordinances);
          // setPending(pending);
          // setVetoed(vetoed);
          // setApproved(approved);
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
    return <div>Loading...</div>;
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
          <p>{ ordinances.length }</p>
        </div>
        <div className="Admin__Card">
          <p>Total Pending Ordinances</p>
          {/* <p>{ pending.length }</p> */}
        </div>
        <div className="Admin__Card">
          <p>Total Vetoed Ordinances</p>
          {/* <p>{ vetoed.length }</p> */}
        </div>
        <div className="Admin__Card">
          <p>Total Approved Ordinances</p>
          {/* <p>{ approved.length }</p> */}
        </div>
      </div>
      {/* <div className="Admin__Card">
        <p>Upload File</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data" action="/upload">
            <input type="file" name="file" id="file" />
            <input type="submit"/>
        </form>
      </div> */}
    </div>
  );
};

export default Users