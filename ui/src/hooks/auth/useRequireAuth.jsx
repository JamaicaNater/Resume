import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const useRequireAuth = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [delayedRedirect, setDelayedRedirect] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        setDelayedRedirect(true);
        setLoadingUser(true)
      } else {
        setLoadingUser(false)
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [user]);

  useEffect(() => {
    if (delayedRedirect) {
      setLoadingUser(false)
      navigate('/login');
    } else {
      setLoadingUser(false)
    }
  }, [delayedRedirect, navigate]);

  return { user, loadingUser };
};

export default useRequireAuth;
