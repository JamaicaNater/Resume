import { ResumeTemplate, Education, Project, Experience, Reference, User } from "../models";
import CollapsibleCard from "../components/CollapsibleCard"
import EducationDetails from "./resumeDetails/EducationDetails";
import { plainToClass } from 'class-transformer';
import { ApiController } from "../utils/api";
import { useContext, useEffect, useReducer } from "react";
import ExperienceDetails from "./resumeDetails/ExperienceDetails";
import ProjectDetails from "./resumeDetails/ProjectDetails";
import './Resume.css';
import UserDetails from "./resumeDetails/UserDetails";
import ReferenceDetails from "./resumeDetails/ReferenceDetails";
import { Card, CircularProgress, Divider, Typography } from "@mui/material";
import TagsDisplay from "./resumeDetails/TagsDisplay";
import { RequestReducer } from "../utils/requestReducer";
import ResumeContext from "./ResumeContext";

export default function Resume() {
    const [tagState, tagsDispatch] = useReducer(RequestReducer.reducer, {
        loading: true,
        data: null,
        error: null,
    })

    const [resumeState, resumeDispatch] = useReducer(RequestReducer.reducer, {
        loading: true,
        data: null,
        error: null,
    })

    const { resumeContextData, setResumeContextData } = useContext(ResumeContext);

    useEffect(() => {
        resumeDispatch(RequestReducer.setLoading(true))
        fetchResumeData()
            .then(data => {
                resumeDispatch(RequestReducer.setData(data))
                resumeDispatch(RequestReducer.setLoading(false))
            })
            .catch(error => console.error(error))
        ApiController.getTags()
            .then(data => tagsDispatch(RequestReducer.setData(data)))
            .catch(error => tagsDispatch(RequestReducer.setError(error)))
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
        resumeState.loading && <CircularProgress/> ||
        resumeState && resumeState.data &&
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
            resumeState.data.user && 
            <div className="card-container">
                <CollapsibleCard title={`${resumeState.data.user.firstName} ${resumeState.data.user.lastName}`} defaultExpandedState={true}> 
                    <UserDetails user={resumeState.data.user}/>
                </CollapsibleCard>
            </div>
        }
        {   
            resumeState.data.education && 
            <div className="card-container">
                <CollapsibleCard title="Education" defaultExpandedState={false}> 
                    {
                    resumeState.data.education.map((education, index, arr) => (    
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
        {   
            resumeState.data.experience && 
            <div className="card-container">
                <CollapsibleCard title="Experience"> 
                    {
                    resumeState.data.experience
                    .filter(project => resumeContextData.tagFilters.every(filter => project.tags.includes(filter)))
                    .map((experience, index, arr) => (     
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
            resumeState.data.projects && 
            <div className="card-container">
                <Typography>{resumeContextData.tagFilters}</Typography>
                <CollapsibleCard title="Projects"> 
                {
                    resumeState.data.projects
                    .filter(project => resumeContextData.tagFilters.every(filter => project.tags.includes(filter)))
                    .map((project, index, arr) => (
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
            resumeState.data.references && 
            <div className="card-container">
                <CollapsibleCard title="References" defaultExpandedState={true}> 
                {
                    resumeState.data.references.map((reference, index, arr) => (
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