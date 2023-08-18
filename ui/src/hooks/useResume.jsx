import { useEffect, useReducer } from 'react';
import { useQuery } from 'react-query'
import { ApiController } from '../utils/api';
import { RequestReducer } from '../utils/requestReducer';
import useResumeParams from './useResumeParams';

export function useResume() {
  const { params } = useResumeParams();
  
  const querySettings = {
    // staleTime: 30000,
    // cacheTime: 3600000,
    enabled: !!params.username,
  }

  const user = useQuery(['user'], ()=>ApiController.getUsers(params), querySettings)
  const education = useQuery(['education'], ()=>ApiController.getEducation(params), querySettings)
  const projects = useQuery(['projects'], ()=>ApiController.getProjects(params), querySettings)
  const references = useQuery(['references'], ()=>ApiController.getReferences(params), querySettings)
  const experience = useQuery(['experience'], ()=>ApiController.getExperience(params), querySettings)
  const tags = useQuery(['tags'], ()=>ApiController.getTags(), querySettings)
  const jobs = useQuery(['jobs'], ()=>ApiController.getJobs(), querySettings)

  useEffect(() => {
    if (!params.username) {
        console.log(`Getting resume for ${params.username}`)
    } else {
      console.warn("Username is not set")
    }
  }, [params.username]);
  
  return {
    params,
    user,
    education,
    projects,
    references,
    experience,
    tags,
    jobs,
  };
}

export default useResume;
