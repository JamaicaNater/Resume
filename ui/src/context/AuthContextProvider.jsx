import AuthContext from "./AuthContext";
import { useAuth } from "../hooks/auth/useAuth";

export const AuthContextProvider = ({ children }) => {
    const { user, login, logout } = useAuth();
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
};
  