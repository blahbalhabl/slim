import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.post('/refresh', {
      withCredentials: true
    });
    setAuth(prev => {
      console.log(res.data);
      return { ...prev, token: res.data}
    });
    return res.data.accessToken;
  }
  return refresh;
}

export default useRefreshToken