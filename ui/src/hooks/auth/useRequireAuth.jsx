import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const useRequireAuth = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, history]);

  return user;
};

export default useRequireAuth;