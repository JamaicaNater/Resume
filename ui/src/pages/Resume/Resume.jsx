import { ResumeTemplate, Education, Project, Experience, Reference, User } from "../../models";
import { useParams } from 'react-router-dom'
import CollapsibleCard from "../../components/CollapsibleCard"
import EducationDetails from "./resumeDetails/EducationDetails";
import { plainToClass } from 'class-transformer';
import { ApiController } from "../../utils/api";
import { useContext, useEffect, useReducer, useState } from "react";
import ExperienceDetails from "./resumeDetails/ExperienceDetails";
import ProjectDetails from "./resumeDetails/ProjectDetails";
import './Resume.css';
import UserDetails from "./resumeDetails/UserDetails";
import ReferenceDetails from "./resumeDetails/ReferenceDetails";
import { Card, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import TagsDisplay from "./resumeDetails/TagsDisplay";
import { RequestReducer } from "../../utils/requestReducer";
import ResumeContext from "../../context/ResumeContext/ResumeContext";
import DelayedComponent from "../../components/DelayedComponent";
import AuthContext from "../../context/AuthContext/AuthContext";

export default function Resume() {
    const { resumeCreator } = useParams();

    const [tagState, tagsDispatch] = useReducer(RequestReducer.reducer, {
        loading: true,
        data: null,
        error: null,
    })

    const [jobState, jobDispatch] = useReducer(RequestReducer.reducer, {
        loading: true,
        data: null,
        error: null,
    })

    const [resumeState, resumeDispatch] = useReducer(RequestReducer.reducer, {
        loading: true,
        data: null,
        error: null,
    })
   
    const { resumeContextData } = useContext(ResumeContext);

    const {user} = useContext(AuthContext);

    const [selectedFilterOption, setSelectedFilterOption] = useState('skill');

    const handleFilterOptionChange = (event) => {
      const value = event.target.value;
      setSelectedFilterOption(value);
      console.log(`Selected option: ${value}`);
    };

    var nextCardNumber = 0;
    const getAnimationDelay = () => {
        const prev = nextCardNumber;
        nextCardNumber = nextCardNumber + 1;

        return `${prev * 0.2}s`
    }
 
    useEffect(() => {
        resumeDispatch(RequestReducer.setLoading(true))
        fetchResumeData()
            .then(data => resumeDispatch(RequestReducer.setData(data)))
            .catch(error => console.error(error))
        
            tagsDispatch(RequestReducer.setLoading(true))
        ApiController.getTags()
            .then(data => tagsDispatch(RequestReducer.setData(data)))
            .catch(error => tagsDispatch(RequestReducer.setError(error)))
        
        jobDispatch(RequestReducer.setLoading(true))
                ApiController.getJobs()
                .then(data => jobDispatch(RequestReducer.setData(data)))
                .catch(error => jobDispatch(RequestReducer.setError(error)))
    }, [user]);

    const fetchResumeData = async () => {
        try {
            const params = resumeCreator ? {username: resumeCreator} : {username: user.username};
            
            const userResponse = await ApiController.getUsers(params);
            const userData = plainToClass(User, userResponse[0]);

            const educationResponse = await ApiController.getEducation(params);
            const education = educationResponse.map((education) => plainToClass(Education, education));

            const experienceResponse = await ApiController.getExperience(params);
            const experience = experienceResponse.map((experience) => plainToClass(Experience, experience));

            const referenceResponse = await ApiController.getReferences(params);
            const references = referenceResponse.map((reference) => plainToClass(Reference, reference));

            const projectResponse = await ApiController.getProjects(params);
            const projects = projectResponse.map((project) => plainToClass(Project, project));

            const resumeTemplate = new ResumeTemplate(education, projects, userData, references, experience)
            return resumeTemplate
        } catch (error) {
            console.error(error);
        }
    }

    return (
        resumeState.loading && 
        <>
            <DelayedComponent>
                <Typography>Loading resume</Typography> 
                <CircularProgress/>
            </DelayedComponent>
        </> ||
        resumeState && resumeState.data &&
        <>
        {
            tagState.data &&
            <div className="card-container">
                <Card className="card" style={{animationDelay: getAnimationDelay()}}>
                    <FormControl fullWidth >
                    <InputLabel margin='dense' id="demo-simple-select-label">Select a Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedFilterOption}
                            label="Filter"
                            onChange={handleFilterOptionChange}
                        >
                            <MenuItem key='skill' value='skill'>Filter by Skill</MenuItem>
                            <MenuItem key='job' value='job'>Filter by Job</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        selectedFilterOption == 'skill' && (tagState.data && <TagsDisplay skills={tagState.data.map(tag => tag.name)}/> || <Typography>Failed to get tag data</Typography>) ||
                        selectedFilterOption == 'job' && (jobState.data && <TagsDisplay skills={jobState.data.map(tag => tag.name)}/> || <Typography>Failed to get job data</Typography>)
                    }
                </Card>
            </div>
        }
        {   
            resumeState.data.user && 
            <div className="card-container">
                <CollapsibleCard className="card" title={`${resumeState.data.user.firstName} ${resumeState.data.user.lastName}`} defaultExpandedState={true} style={{animationDelay: getAnimationDelay()}}> 
                    <UserDetails user={resumeState.data.user}/>
                </CollapsibleCard>
            </div>
        }
        {   
            resumeState.data.education && 
            <div className="card-container">
                <CollapsibleCard className="card" title="Education" defaultExpandedState={false} style={{animationDelay: getAnimationDelay()}}> 
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
                <CollapsibleCard className="card" title="Experience" style={{animationDelay: getAnimationDelay()}}> 
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
                <CollapsibleCard className="card" title="Projects" style={{animationDelay: getAnimationDelay()}}> 
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
                <CollapsibleCard className="card" title="References" defaultExpandedState={true} style={{animationDelay: getAnimationDelay()}}> 
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