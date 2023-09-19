import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import CreateOrdinances from '../components/CreateOrdinances';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import BreadCrumbs from '../components/BreadCrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../utils/Icons'
import '../styles/Ordinances.css'


const Ordinances = () => {
  const { auth } = useAuth();
  const { status } = useParams();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [ordinances, setOrdinances] = useState();
  const [isEditing, setIsEditing] = useState(true);
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedOrdinance, setSelectedOrdinance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const pathnames = location.pathname.split('/').filter((item) => item !== '');

  const breadcrumbs = pathnames.map((name, index) => ({
    label: name,
    url: `/${pathnames.slice(0, index + 1).join('/')}`,
  }));

  const sendRequest = async () => {
    try {
      const res = await axiosPrivate.get(`/ordinances?type=ordinances&level=${auth.level}&status=${status}`);
      const ordinances = res.data;
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
        headers: { Authorization: `Bearer ${auth.token}` }
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
  };

  const handleOrdinanceClick = async (ordinance) => {
    setSelectedOrdinance(ordinance);
  
    try {
      const response = await axiosPrivate.get(`/download/${ordinance.file}?type=ordinances&level=${auth.level}&series=${ordinance.series}`, {
        responseType: 'blob',
      });
      // Create a blob object from the binary data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      // Set the PDF URL for the iframe
      setPdfUrl(url);
      
      openModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    sendRequest()
    .then(({
      ordinances,
    }) => {
      if ( isMounted ) {
        setOrdinances(ordinances);
      }
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    });

    return () => {
      isMounted = false;
    }
  },[auth.level, status, isModalOpen]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="Ordinances">
      <BreadCrumbs items={breadcrumbs} />
      <div className="Ordinances__Card">
        <CreateOrdinances sendRequest={sendRequest()}/>
      </div>
      <div className="Ordinances__Container">
      <h3 className='Ordinances__Top__Title'>{status.toUpperCase()} ORDINANCES</h3>
      <div className="Ordinances__Legend">
        <h4>Legend:</h4>
        <div>
          <div style={{backgroundColor: 'orange'}}></div>
          <p>Draft</p>
        </div>
        <div>
          <div style={{backgroundColor: 'green'}}></div>
          <p>Enacted</p>
        </div>
        <div>
          <div style={{backgroundColor: 'blue'}}></div>
          <p>Approved</p>
        </div>
        <div>
          <div style={{backgroundColor: 'red'}}></div>
          <p>Amended</p>
        </div>
      </div>
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
                (ordinance.status === status || status === 'all' && ordinance.accessLevel === auth.level) ? (
                  <tbody key={i} >
                  <tr
                    className='Ordinances__Link'
                    style={
                      {color: 
                        ordinance.status === 'draft' 
                        ? 'orange' 
                        : ordinance.status === 'enacted'
                        ? 'green'
                        : ordinance.status === 'approved'
                        ? 'blue'
                        : ordinance.status === 'amended'
                        ? 'red' : 'black'
                      }
                    }
                    key={i}>
                    <td>
                      { ordinance.mimetype === 'application/pdf' && (<FontAwesomeIcon icon={icons.pdf}/>)}
                    </td>
                    <td 
                      className='Ordinances__Number' onClick={() => handleOrdinanceClick(ordinance)}
                    >
                        <p>ORDINANCE NO {ordinance.number}, Series of {ordinance.series} {ordinance.title.toUpperCase()}</p>
                    </td>
                    <td 
                      className='Ordinances__Date'>
                        {new Date(ordinance.createdAt).toLocaleString()}
                    </td>
                    <td>
                      { ordinance.size } k
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
      {selectedOrdinance && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <div className="Ordinances__Details">
            <form>
              <h2>ORDINANCE DETAILS</h2>
              <div className="Ordinances__Details__Title">
                <p>ORDINANCE NO </p>
                <input
                  className='Ordinances__Details__Title__Input'
                  type="number" 
                  name="number" 
                  id="number"
                  style={{width: '50px'}}
                  value={selectedOrdinance.number}
                  onChange={(e) => setSelectedOrdinance({...selectedOrdinance, number: e.target.value})} 
                  readOnly={isEditing}
                />
                  <p>, Series of</p>
                <input
                  className='Ordinances__Details__Title__Input'
                  type="number" 
                  name="series" 
                  id="series"
                  style={{width: '50px'}}
                  value={selectedOrdinance.series}
                  onChange={(e) => setSelectedOrdinance({...selectedOrdinance, series: e.target.value})}
                  readOnly={isEditing}
                />
                <input
                  className='Ordinances__Details__Title__Input'
                  type="text"
                  name='title'
                  id='title'
                  value={selectedOrdinance.title}
                  onChange={(e) => setSelectedOrdinance({...selectedOrdinance, title: e.target.value})}
                  readOnly={isEditing}
                />
                <input
                  className='Ordinances__Details__Title__Input'
                  type="text"
                  name='status'
                  id='status'
                  value={selectedOrdinance.status}
                  onChange={(e) => setSelectedOrdinance({...selectedOrdinance, status: e.target.value})}
                  readOnly={isEditing}
                />
              </div>
              <div className="Ordinances__Details__Content">
                <button onClick={(e) => {e.preventDefault(); setIsEditing(false)}}>Edit</button>
                {!isEditing ? ( <button onClick={(e) => {e.preventDefault(); setIsEditing(true)}}>Cancel</button> ) : null}
                {!isEditing ? ( <button onClick={(e) => {e.preventDefault(); setIsEditing(true); updateRequest}}>Update</button> ) : null}
                <button>Delete</button>
                <div className="Ordinances__PDFViewer">
                  <iframe
                    title="PDF Viewer"
                    src={pdfUrl} // Set the PDF file URL as the iframe source
                    width="100%"
                    height="500px"
                  ></iframe>
              </div>
              </div>
            </form>
            
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Ordinances;