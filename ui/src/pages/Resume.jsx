import { ResumeTemplate, Education, Project, Experience, Reference, User } from "../models";
import CollapsibleCard from "../components/CollapsibleCard"
import EducationDetails from "./resumeDetails/EducationDetails";
import { plainToClass } from 'class-transformer';
import { ApiController } from "../utils/api";
import { useEffect, useReducer, useState } from "react";
import ExperienceDetails from "./resumeDetails/ExperienceDetails";
import ProjectDetails from "./resumeDetails/ProjectDetails";
import './Resume.css';
import UserDetails from "./resumeDetails/UserDetails";
import ReferenceDetails from "./resumeDetails/ReferenceDetails";
import { Card, CircularProgress, Divider, Typography } from "@mui/material";
import TagsDisplay from "./resumeDetails/TagsDisplay";


const tagReducer = (state, action) => {
    switch (action.type) {
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'SET_DATA':
        return { ...state, data: action.payload, loading: false };
      case 'SET_ERROR':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
}

export default function Resume() {
    const [resumeData, setResumeData] = useState(0);
    const [tagState, tagsDispatch] = useReducer(tagReducer, {
        loading: true,
        data: null,
        error: null,
    })
    const [loadingResumeData, setLoadingResumeData] = useState(true);

    useEffect(() => {
        setLoadingResumeData(true);
        fetchResumeData()
            .then(data => {
                setResumeData(data);
                setLoadingResumeData(false);
            })
            .catch(error => console.error(error))
        ApiController.getTags()
            .then(data => tagsDispatch({type: 'SET_DATA', payload: data}))
            .catch(error => tagsDispatch({type: 'SET_ERROR', payload: error}))
    }, []);

    const fetchResumeData = async () => {
        try {
            const userResponse = await ApiController.getUsers();
            const user = plainToClass(User, userResponse);

            const educationResponse = await ApiController.getEducation();
            const education = educationResponse.map((education) => plainToClass(Education, education));

            const experienceResponse = await ApiController.getExperience();
            const experience = experienceResponse.map((experience) => plainToClass(Experience, experience));

            const referenceResponse = await ApiController.getReferences();
            const references = referenceResponse.map((reference) => plainToClass(Reference, reference));

            const projectResponse = await ApiController.getProjects();
            const projects = projectResponse.map((project) => plainToClass(Project, project));

            const resumeTemplate = new ResumeTemplate(education, projects, user, references, experience)
            return resumeTemplate
        } catch (error) {
            console.error(error);
        }
    }

    return (
        loadingResumeData && <CircularProgress/> ||
        resumeData && 
        <>
        {
            tagState.data &&
            <div className="card-container">
                <Card>
                    <Typography variant="body1" sx={{marginTop: '1rem'}}>Filter by skill</Typography>
                    <TagsDisplay skills={tagState.data.map(tag => tag.name)}/>
                </Card>
            </div>
        }
        {   
            resumeData.user && 
            <div className="card-container">
                <CollapsibleCard title={`${resumeData.user.firstName} ${resumeData.user.lastName}`} defaultExpandedState={true}> 
                    <UserDetails user={resumeData.user}/>
                </CollapsibleCard>
            </div>
        }
        {   
            resumeData.education && 
            <div className="card-container">
                <CollapsibleCard title="Education" defaultExpandedState={false}> 
                    {
                    resumeData.education.map((education, index, arr) => (    
                        <>                    
                            <EducationDetails key={index} education={education}/>
                        {
                            arr.length-1 > index &&
                            <div className="divider">
                                <Divider/>
                            </div>
                        }
                        </>
                    ))
                    }
                </CollapsibleCard>
            </div>
        }
        {   resumeData.experience && 
            <div className="card-container">
                <CollapsibleCard title="Experience"> 
                    {
                    resumeData.experience.map((experience, index, arr) => (     
                        <>                   
                            <ExperienceDetails key={index} experience={experience}/>
                        {
                            arr.length-1 > index &&
                            <div className="divider">
                                <Divider/>
                            </div>
                        }
                        </>
                    ))
                    }
                </CollapsibleCard>
            </div>
        }
        {   
            resumeData.projects && 
            <div className="card-container">
                <CollapsibleCard title="Projects"> 
                {
                    resumeData.projects.map((project, index, arr) => (
                        <>
                            <ProjectDetails key={index} project={project}/>
                        {
                            arr.length-1 > index &&
                            <div className="divider">
                                <Divider/>
                            </div>
                        }
                        </>                        
                        
                    ))
                }
                </CollapsibleCard>
            </div>
        }
        {   
            resumeData.references && 
            <div className="card-container">
                <CollapsibleCard title="References" defaultExpandedState={true}> 
                {
                    resumeData.references.map((reference, index, arr) => (
                        <>
                            <ReferenceDetails key={index} reference={reference}/>
                        {
                            arr.length-1 > index &&
                            <div className="divider">
                                <Divider/>
                            </div>
                        }
                        </>
                    ))
                }
                </CollapsibleCard>
            </div>
        }
        </>
      );
}