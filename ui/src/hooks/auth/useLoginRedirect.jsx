import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const useLoginRedirect = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [ redirecting, setRedirecting ] = useState(user ? true : false)


  useEffect(() => {
    setRedirecting(user ? true : false)
    const timeoutId = setTimeout(() => {
      if (!user) {
        navigate("/login");
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [user, navigate]);

  return redirecting;
};

export default useLoginRedirect;
