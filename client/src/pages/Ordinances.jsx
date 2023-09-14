import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import CreateOrdinances from '../components/CreateOrdinances';

const Ordinances = () => {
  const { auth } = useAuth();
  const { status } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState();
  const [ordinances, setOrdinances] = useState();
  const [pending, setPending] = useState();
  const [vetoed, setVetoed] = useState();
  const [approved, setApproved] = useState();
  const [enacted, setEnacted] = useState();

  const sendRequest = async () => {
    try {
      const res = await axiosPrivate.get(`/ordinances?level=${auth.level}`);
      const ordinances = res.data;
      const drafts = ordinances.filter((ordinance) => ordinance.status === 'draft');
      const pending = ordinances.filter((ordinance) => ordinance.status === 'pending');
      const enacted = ordinances.filter((ordinance) => ordinance.status === 'enacted');
      const vetoed = ordinances.filter((ordinance) => ordinance.status === 'vetoed');
      const approved = ordinances.filter((ordinance) => ordinance.status === 'approved');
      return {
        ordinances: ordinances,
        drafts: drafts,
        pending: pending,
        vetoed: vetoed,
        approved: approved,
        encated: enacted,
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
      drafts,
      ordinances,
      pending,
      vetoed,
      approved,
      enacted,
    }) => {
      if ( isMounted ) {
        setDrafts(drafts);
        setOrdinances(ordinances);
        setPending(pending);
        setVetoed(vetoed);
        setApproved(approved);
        setEnacted(enacted);
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

  return (
    <div className="Ordinances">
      <CreateOrdinances />
      { status === 'draft' && drafts.length !== 0 && drafts.every(draft => draft.accessLevel === auth.level)
        ? ( drafts.map((draft, i) => (
          <div key={i}>
            <p>Ordinance Number: {draft.number}</p>
            <p>Series of: {draft.series}</p>
            <p>Ordinance: {draft.title}</p>
            <p>Upload Date: {new Date(draft.createdAt).toLocaleString()}</p>
          </div>))
        ) : (<p>No {status} Ordinances</p>)
      }
    </div>
  )
}

export default Ordinances