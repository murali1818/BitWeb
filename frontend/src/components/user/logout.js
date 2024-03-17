import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('/logout'); // Call the logout endpoint
        onLogout();
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    logout();
   
  }, [navigate, onLogout]);

  return null;
};

export default Logout;
