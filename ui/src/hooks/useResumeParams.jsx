import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";

const useResumeParams = () => {
  const { user } = useContext(AuthContext);
  let { resumeCreator } = useParams();
  const params = resumeCreator ? { username: resumeCreator } : { username: user?.username };

  const canEdit = params.username == user?.username

  useEffect(()=>{
  }, [user?.username])

  return {params, canEdit}
}

export default useResumeParams;