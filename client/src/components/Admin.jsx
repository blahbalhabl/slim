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
  
  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosPrivate.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully", res.data);
    } catch (err) {
      console.error('Error uploading file', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("file");
    if(fileInput.isDefaultNamespace.length === 1) {
      const file = fileInput.files[0];
      handleFileUpload(file);
    } else {
      console.log('No file Selected');
    }
  }

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
    <div className="Admin">
      <div className="Admin__Card">
        <p>Number of Users:</p>
        <p>{ users }</p>
      </div>
      <div className="Admin__Card">
        <p>Upload File</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data" action="/upload">
            <input type="file" name="file" id="file" />
            <input type="submit"/>
        </form>
      </div>
    </div>
  );
};

export default Users