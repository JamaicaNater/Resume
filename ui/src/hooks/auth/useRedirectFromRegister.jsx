import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const useRedirectFromRegister = (route) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [ redirecting, setRedirecting ] = useState(user?.id ? true : false)

  useEffect(() => {
    setRedirecting(user?.id ? true : false)
    const timeoutId = setTimeout(() => {
      if (user?.id) {
        navigate(route);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [user, navigate, route]);

  return redirecting;
};

export default useRedirectFromRegister;
