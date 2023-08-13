import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const useLoginRedirect = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [ redirecting, setRedirecting ] = useState(user ? false : true)


  useEffect(() => {
    setRedirecting(user ? false : true)
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
