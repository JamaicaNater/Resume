import { useEffect, useReducer } from 'react';
import { useQuery } from 'react-query'
import { ApiController } from '../utils/api';
import { RequestReducer } from '../utils/requestReducer';
import useResumeParams from './useResumeParams';

export function useResume() {
  const { params } = useResumeParams();
  const user = useQuery('user', ()=>ApiController.getUsers(params))
  const education = useQuery('education', ()=>ApiController.getEducation(params))
  const projects = useQuery('projects', ()=>ApiController.getProjects(params))
  const references = useQuery('references', ()=>ApiController.getReferences(params))
  const experience = useQuery('experience', ()=>ApiController.getExperience(params))
  const tags = useQuery('tags', ()=>ApiController.getTags())
  const jobs = useQuery('jobs', ()=>ApiController.getJobs())

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

  const fetchResumeData = async () => {
    try {
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

    if (params.username) {
        fetchResumeData();
    } else {
      console.warn("Username is not set")
    }
  }, []);
  return {
    params,
    user,
    education,
    projects,
    references,
    experience,
    tags,
    jobs,
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
