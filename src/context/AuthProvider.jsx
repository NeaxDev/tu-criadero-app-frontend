import { useState, useEffect, createContext } from "react";
import { userAuth } from "../api/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const userAutenticate = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const { success, data } = await userAuth(token);
      if (!success) {
        setAuth({});
        return;
      }

      setAuth(data);
      setLoading(false);
    };
    userAutenticate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
