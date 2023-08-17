import { useContext, useEffect, useReducer } from 'react';
import { ApiController } from '../utils/api';
import { RequestReducer } from '../utils/requestReducer';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext/AuthContext';

export function useResume() {
  const [userState, userDispatch] = useReducer(RequestReducer.reducer, {
    data: null,
    loading: null,
    error: null,
  });

  const [educationState, educationDispatch] = useReducer(RequestReducer.reducer, {
    data: null,
    loading: null,
    error: null,
  });

  const [projectState, projectDispatch] = useReducer(RequestReducer.reducer, {
    data: null,
    loading: null,
    error: null,
  });

  const [referenceState, referenceDispatch] = useReducer(RequestReducer.reducer, {
    data: null,
    loading: null,
    error: null,
  });

  const [experienceState, experienceDispatch] = useReducer(RequestReducer.reducer, {
    data: null,
    loading: null,
    error: null,
  });

  const { resumeCreator } = useParams();
  const { user } = useContext(AuthContext);

  const fetchResumeData = async () => {
    try {
      const params = resumeCreator ? { username: resumeCreator } : { username: user.username };

      const userResponse = await ApiController.getUsers(params);
      userDispatch(RequestReducer.setData(userResponse[0]));

      const educationResponse = await ApiController.getEducation(params);
      educationDispatch(RequestReducer.setData(educationResponse));

      const projectResponse = await ApiController.getProjects(params);
      projectDispatch(RequestReducer.setData(projectResponse));

      const referenceResponse = await ApiController.getReferences(params);
      referenceDispatch(RequestReducer.setData(referenceResponse));

      const experienceResponse = await ApiController.getExperience(params);
      experienceDispatch(RequestReducer.setData(experienceResponse));

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userDispatch(RequestReducer.setLoading(true));
    educationDispatch(RequestReducer.setLoading(true));
    projectDispatch(RequestReducer.setLoading(true));
    referenceDispatch(RequestReducer.setLoading(true));
    experienceDispatch(RequestReducer.setLoading(true));

    if (user && user.username) {
        fetchResumeData();
    } else {
      console.warn("Username is not set")
    }

}, [resumeCreator, user && user.username]);
  return {
    userState,
    educationState,
    projectState,
    referenceState,
    experienceState,
    userDispatch,
    educationDispatch,
    projectDispatch,
    referenceDispatch,
    experienceDispatch,
  };
}

export default useResume;
