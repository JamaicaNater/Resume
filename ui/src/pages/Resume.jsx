import { ResumeTemplate, Education, Project, Experience, Reference, User } from "../models";
import CollapsibleCard from "../components/CollapsibleCard"
import EducationDetails from "./resumeDetails/EducationDetails";
import { plainToClass } from 'class-transformer';
import { ApiController } from "../utils/api";
import { useEffect, useState } from "react";
import ExperienceDetails from "./resumeDetails/ExperienceDetails";
import ProjectDetails from "./resumeDetails/ProjectDetails";
import './Resume.css';

export default function Resume() {
    const [resumeData, setResumeData] = useState(0);

    useEffect(() => {
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
                setResumeData(resumeTemplate)
            } catch (error) {
                console.error(error);
            }
        }
        fetchResumeData()
    }, []);

    return (
        <>
          {   
            resumeData && resumeData.education && 
            <div className="card-container">
              <CollapsibleCard title="Education" defaultExpandedState={false}> 
                {
                  resumeData.education.map((education, index) => (                        
                    <EducationDetails key={index} education={education}></EducationDetails>
                  ))
                }
              </CollapsibleCard>
            </div>
          }
          {   resumeData && resumeData.experience && 
            <div className="card-container">
              <CollapsibleCard title="Experience"> 
                {
                  resumeData.experience.map((experience, index) => (                        
                    <ExperienceDetails key={index} experience={experience}></ExperienceDetails>
                  ))
                }
              </CollapsibleCard>
            </div>
          }
          {   
            resumeData && resumeData.projects && 
            <div className="card-container">
              <CollapsibleCard title="Projects"> 
                {
                  resumeData.projects.map((project, index) => (                        
                    <ProjectDetails key={index} project={project}></ProjectDetails>
                  ))
                }
              </CollapsibleCard>
            </div>
          }
        </>
      );
}