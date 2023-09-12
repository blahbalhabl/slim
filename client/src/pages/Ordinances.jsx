import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

const Ordinances = () => {
  const { status } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState();
  // const [ordinances, setOrdinances] = useState();
  // const [pending, setPending] = useState();
  // const [vetoed, setVetoed] = useState();
  // const [approved, setApproved] = useState();

  const sendRequest = async () => {
    try {
      const res = await axiosPrivate.get('/ordinances');
      const ordinances = res.data;
      const draft = ordinances.filter((ordinance) => ordinance.status === 'draft');
      console.log(draft);
      // const ordinances = await axiosPrivate.get('/files');
      // const ordinancesData = ordinances.data.myFiles;

      // const pendingOrdinances = ordinancesData.filter(file => file.metadata && file.metadata.status === "pending");
      // const vetoedOrdinances = ordinancesData.filter(file => file.metadata && file.metadata.status === "vetoed");
      // const approvedOrdinances = ordinancesData.filter(file => file.metadata && file.metadata.status === "approved");

      return {
        draft: draft,
        // ordinances: ordinances,
        // pending: pendingOrdinances,
        // vetoed: vetoedOrdinances,
        // approved: approvedOrdinances,
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    sendRequest()
    .then(({
      draft,
      // ordinances,
      // pending,
      // vetoed,
      // approved
    }) => {
      if ( isMounted ) {
        setDraft(draft);
        // setOrdinances(ordinances);
        // setPending(pending[0]);
        // setVetoed(vetoed[0]);
        // setApproved(approved[0]);
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
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const date = new Date(approved.uploadDate).toLocaleString()

  return (
    <div className="Ordinances">
      { status === 'draft' && draft.length !== 0
        ? <div>
            <p>Ordinance: {draft}</p>
            {/* <p>Upload Date: {date}</p> */}
          </div>
        : <p>No {status} Ordinances</p>}
    </div>
  )
}

export default Ordinances