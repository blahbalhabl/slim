import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.post('/refresh', {
      withCredentials: true
    });
    setAuth(prev => {
      console.log(prev)
      console.log(res.data.token)
      return {
        ...prev,
        id: res.data.id,
        name: res.data.name,
        role: res.data.role,
        token: res.data.token, }
    });
    return res.data.token;
  }
  return refresh;
}

export default useRefreshToken;