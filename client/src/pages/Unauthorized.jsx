import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <>
    <div>Unauthorized</div>
    <button onClick={goBack}>BACK</button>
    </>
  )
}

export default Unauthorized