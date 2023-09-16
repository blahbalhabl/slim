import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import CreateOrdinances from '../components/CreateOrdinances';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../components/Loader';
import { icons } from '../utils/Icons'
import '../styles/Ordinances.css'

const Ordinances = () => {
  const { auth } = useAuth();
  const { status } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [ordinances, setOrdinances] = useState();

  const sendRequest = async () => {
    try {
      const res = await axiosPrivate.get(`/ordinances?type=ordinances&level=${auth.level}&status=${status}`);
      const ordinances = res.data;
      // const drafts = ordinances.filter((ordinance) => ordinance.status === 'draft');
      return {
        ordinances: ordinances,
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDownload = async (filename, series) => {
    try {
      const response = await axiosPrivate.get(`/download/${filename}?type=ordinances&level=${auth.level}&series=${series}`, {
        responseType: 'blob', // Set the response type to 'blob' to handle binary data
      });
  
      // Create a blob object from the binary data
      const blob = new Blob([response.data]);
  
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a link element to trigger the download
      const fileLink = document.createElement('a');
      fileLink.href = url;
      fileLink.download = filename;
      fileLink.click();
  
      // Clean up the URL created for the blob
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    let isMounted = true;
    sendRequest()
    .then(({
      ordinances,
    }) => {
      if ( isMounted ) {
        setOrdinances(ordinances);
        console.log(ordinances)
      }
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    });

    return () => {
      isMounted = false;
    }
  },[auth.level, status]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="Ordinances">
      <CreateOrdinances />
      <div className="Ordinances__Container">
      <h3 className='Ordinances__Top__Title'>{status.toUpperCase()} ORDINANCES</h3>
        <table className="Ordinances__Content">
          <thead>
            <tr className="Ordinances__Header">
              <th>Type</th>
              <th>Title</th>
              <th>Date</th>
              <th>Size</th>
              <th></th>
            </tr>
          </thead>
          { ordinances.length > 0 ? (
              ordinances.map((ordinance, i) => (
                (ordinance.status === status && ordinance.accessLevel === auth.level) ? (
                  <tbody key={i}>
                  <tr 
                    className='Ordinances__Link' 
                    key={i}>
                    <td>
                      { ordinance.mimetype === 'application/pdf' && (<FontAwesomeIcon icon={icons.pdf}/>)}
                    </td>
                    <td 
                      className='Ordinances__Number'>
                        <p>ORDINANCE NO {ordinance.number}, Series of {ordinance.series} {ordinance.title.toUpperCase()}</p>
                    </td>
                    <td 
                      className='Ordinances__Date'>
                        {new Date(ordinance.createdAt).toLocaleString()}
                    </td>
                    <td>
                      { ordinance.size } kb
                    </td>
                    <td className='Ordinances__Center'>
                      <FontAwesomeIcon 
                        className='Ordinances__Download'
                        onClick={() => handleDownload(ordinance.file, ordinance.series)}
                        icon={icons.download} />
                    </td>
                  </tr>
                  </tbody>
                ) : null
              ))
            ) : ( <tbody>
                    <tr>
                      <td>No {status} Ordinances</td>
                    </tr>
                  </tbody> )
          }
        </table>
      </div>
    </div>
  )
}

export default Ordinances