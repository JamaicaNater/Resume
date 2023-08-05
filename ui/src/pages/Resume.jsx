import { ResumeTemplate, Education, Project, Experience, Reference, User } from "../models";
import CollapsibleCard from "../components/CollapsibleCard"
import EducationDetails from "./resumeDetails/EducationDetails";
import { plainToClass } from 'class-transformer';
import { ApiController } from "../utils/api";
import { useEffect, useState } from "react";
import ExperienceDetails from "./resumeDetails/ExperienceDetails";

export default function Resume() {
    const [resumeData, setResumeData] = useState(0);

    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                const userResponse = await ApiController.getUsers();
                const user = plainToClass(User, userResponse);

                const educationResponse = await ApiController.getEducation();
                const educations = educationResponse.map((education) => plainToClass(Education, education));

                const experienceResponse = await ApiController.getExperience();
                const experience = experienceResponse.map((experience) => plainToClass(Experience, experience));

                const referenceResponse = await ApiController.getReferences();
                const references = referenceResponse.map((reference) => plainToClass(Reference, reference));

                const projectResponse = await ApiController.getProjects();
                const projects = projectResponse.map((project) => plainToClass(Project, project));

                const resumeTemplate = new ResumeTemplate(educations, projects, user, references, experience)
                setResumeData(resumeTemplate)
            } catch (error) {
                console.error(error);
            }
        }
        fetchResumeData()
    }, []);

    return(
        <>
            {Object.keys(resumeData).map((resumeSection, index) => (
                <CollapsibleCard key={index} title={resumeSection}>
                    {JSON.stringify(resumeData[resumeSection])}
                </CollapsibleCard>
            ))}
            { resumeData && resumeData.education &&
                resumeData.education.map((education, index) => (
                    <>
                        <CollapsibleCard key={index} title="Education"> 
                            <EducationDetails key={index} education={education}></EducationDetails>
                        </CollapsibleCard>
                    </>
                ))
            }
            { resumeData && resumeData.experience &&
                resumeData.experience.map((experience, index) => (
                    <>
                        <CollapsibleCard key={index} title="Experience"> 
                            <ExperienceDetails key={index} experience={experience}></ExperienceDetails>
                        </CollapsibleCard>
                    </>
                ))
            }
        </>
    );
}