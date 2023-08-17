import CollapsibleCard from "../../components/CollapsibleCard"
import EducationDetails from "./resumeDetails/EducationDetails";
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
import AuthContext from "../../context/AuthContext/AuthContext";

export default function Resume() {

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
   
    const { resumeContextData, userState, educationState, projectState, referenceState, experienceState } = useContext(ResumeContext);

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
        ApiController.getTags()
            .then(data => tagsDispatch(RequestReducer.setData(data)))
            .catch(error => tagsDispatch(RequestReducer.setError(error)))
        
        jobDispatch(RequestReducer.setLoading(true))
                ApiController.getJobs()
                .then(data => jobDispatch(RequestReducer.setData(data)))
                .catch(error => jobDispatch(RequestReducer.setError(error)))
    }, [user, userState, educationState, projectState, referenceState, experienceState ]);
    return (
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
            userState.data && 
            <div className="card-container">
                <CollapsibleCard className="card" title={`${userState.data.firstName} ${userState.data.lastName}`} defaultExpandedState={true} style={{animationDelay: getAnimationDelay()}}> 
                    <UserDetails user={userState.data}/>
                </CollapsibleCard>
            </div>
        }
        {   
            educationState.data && 
            <div className="card-container">
                <CollapsibleCard className="card" title="Education" defaultExpandedState={false} style={{animationDelay: getAnimationDelay()}}> 
                    {
                    educationState.data.map((education, index, arr) => (    
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
            experienceState.data && 
            <div className="card-container">
                <CollapsibleCard className="card" title="Experience" style={{animationDelay: getAnimationDelay()}}> 
                    {
                    experienceState.data
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
            projectState.data && 
            <div className="card-container">
                <CollapsibleCard className="card" title="Projects" style={{animationDelay: getAnimationDelay()}}> 
                {
                    projectState.data
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
            referenceState.data && 
            <div className="card-container">
                <CollapsibleCard className="card" title="References" defaultExpandedState={true} style={{animationDelay: getAnimationDelay()}}> 
                {
                    referenceState.data.map((reference, index, arr) => (
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