import CollapsibleCard from "../../components/CollapsibleCard"
import EducationDetails from "./resumeDetails/EducationDetails";
import { ApiController } from "../../utils/api";
import { useContext, useState } from "react";
import ExperienceDetails from "./resumeDetails/ExperienceDetails";
import ProjectDetails from "./resumeDetails/ProjectDetails";
import './Resume.css';
import UserDetails from "./resumeDetails/UserDetails";
import ReferenceDetails from "./resumeDetails/ReferenceDetails";
import { Card, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import TagsDisplay from "./resumeDetails/TagsDisplay";
import ResumeContext from "../../context/ResumeContext/ResumeContext";
import useResumeParams from "../../hooks/useResumeParams";
import PushResumeData from "./resumeDetails/PushResumeData";
import Education from "../../models/Education";
import Experience from "../../models/Experience";
import Project from "../../models/Project";
import Reference from "../../models/Reference";

export default function Resume() {
   
    const { tagFilters, tags, jobs, user, education, projects, references, experience } = useContext(ResumeContext);

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

    const {canEdit} = useResumeParams();
 
    return (
        <>
        {
            tags.data && jobs.data &&
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
                        selectedFilterOption == 'skill' && (tags.data && <TagsDisplay skills={tags.data.map(tag => tag.name)}/> || <Typography>Failed to get tag data</Typography>) ||
                        selectedFilterOption == 'job' && (jobs.data && <TagsDisplay skills={jobs.data.map(tag => tag.name)}/> || <Typography>Failed to get job data</Typography>)
                    }
                </Card>
            </div>
        }
        {   
            user && user.data && user.data[0] &&
            <div className="card-container">
                <CollapsibleCard className="card" title={`${user.data[0].firstName} ${user.data[0].lastName}`} defaultExpandedState={true} style={{animationDelay: getAnimationDelay()}}> 
                    <UserDetails user={user.data[0]}/>
                </CollapsibleCard>
            </div>
        }
        {   
            education && education.data && 
            <div className="card-container">
                <CollapsibleCard className="card" title="Education" defaultExpandedState={false} style={{animationDelay: getAnimationDelay()}}> 
                {
                    education.data.map((education, index, arr) => (    
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
                {                    
                    canEdit && <div>
                        <PushResumeData queryKey={['education']} data={new Education()} apiCall={ApiController.createEducation}/>
                    </div>
                }
                </CollapsibleCard>
            </div>
        }
        {   
            experience && experience.data && 
            <div className="card-container">
                <CollapsibleCard className="card" title="Experience" style={{animationDelay: getAnimationDelay()}}> 
                {
                    experience.data
                    .filter(project => tagFilters.every(filter => project.tags.includes(filter)))
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
                {
                    canEdit && <div>
                        <PushResumeData queryKey={['experience']} data={new Experience()} apiCall={ApiController.createExperience}/>
                    </div>
                }
                </CollapsibleCard>
            </div>
        }
        {   
            projects && projects.data && 
            <div className="card-container">
                <CollapsibleCard className="card" title="Projects" style={{animationDelay: getAnimationDelay()}}> 
                {
                    projects.data
                    .filter(project => tagFilters.every(filter => project.tags.includes(filter)))
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
                {
                    canEdit && <div>
                        <PushResumeData queryKey={['projects']} data={new Project()} apiCall={ApiController.createProject}/>
                    </div>
                }
                </CollapsibleCard>
            </div>
        }
        {   
            references && references.data && 
            <div className="card-container">
                <CollapsibleCard className="card" title="References" defaultExpandedState={true} style={{animationDelay: getAnimationDelay()}}> 
                {
                    references.data.map((reference, index, arr) => (
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
                {
                    canEdit && <div>
                        <PushResumeData queryKey={['references']} data={new Reference()} apiCall={ApiController.createReference}/>
                    </div>
                }
                </CollapsibleCard>
            </div>
        }
        </>
      );
}