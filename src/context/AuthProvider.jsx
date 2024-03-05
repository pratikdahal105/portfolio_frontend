import { createContext, useState, useEffect } from "react";
import axios from "../api/Axios"; // Import your Axios instance
import { Loading } from "../components/Common/Loading";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchUserData = async () => {
        setLoading(false);
        try {
          const response = await axios.get("/user");
          if (response.data.status) {
            const username = response.data.data.username;
            setAuth({ ...response.data.status, isAuthenticated: true, username });
          }
        } catch (error) {
          setAuth({ isAuthenticated: false, user: null });
        } finally {
          setLoading(false);
        }
      };
    
      fetchUserData();
    }, []);
    
    return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        {loading ? <Loading /> : children}
      </AuthContext.Provider>
    );    
};

export default AuthContext;
