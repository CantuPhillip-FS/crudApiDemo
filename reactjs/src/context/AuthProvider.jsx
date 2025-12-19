import { useEffect, useState } from "react";
import getCurrentUser from "../services/auth-services/getCurrentUser";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const storedUser = getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
      }
    })();
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
