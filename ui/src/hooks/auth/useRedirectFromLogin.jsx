import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const useRedirectFromLogin = (route) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [ redirecting, setRedirecting ] = useState(user ? true : false)

  useEffect(() => {
    setRedirecting(user ? true : false)
    const timeoutId = setTimeout(() => {
      if (user) {
        navigate(route);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [user, navigate, route]);

  return redirecting;
};

export default useRedirectFromLogin;
