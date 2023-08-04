import { ResumeTemplate, Education, Project, Experience, Reference, User } from "../models";
import CollapsibleCard from "../components/CollapsibleCard"
import EducationDetails from "../utils/resumeDetails";
import { plainToClass } from 'class-transformer';
import { ApiController } from "../utils/api";
import { useEffect, useState } from "react";

export default function Resume() {
    const [resumeData, setResumeData] = useState(0);

    useEffect(() => {

        const fetchResumeData = async () => {
            try {
                const educationResponse = await ApiController.getEducation();
                const education = plainToClass(Education, educationResponse[0]);

                const experienceResponse = await ApiController.getExperience();
                const experience = plainToClass(Experience, experienceResponse[0]);

                const referenceResponse = await ApiController.getReferences();
                const reference = plainToClass(Reference, referenceResponse[0]);

                const userResponse = await ApiController.getUsers();
                const user = plainToClass(User, userResponse[0]);

                const projectResponse = await ApiController.getProjects();
                const project = plainToClass(Project, projectResponse[0]);

                const resumeTemplate = new ResumeTemplate(education, project, user, reference, experience)
                setResumeData(resumeTemplate)
                console.log(Object.keys(resumeData))
            } catch (error) {
                console.error(error);
            }
        }
        fetchResumeData()
    }, []);

    return(
        <>
            {Object.keys(resumeData).map((resumeSection, index) => (
                <CollapsibleCard key={index} title={resumeSection} content={JSON.stringify(resumeData[resumeSection])} hidden_content={`Expand to view ${resumeSection} data`}/>
            ))}
            { resumeData &&
                <EducationDetails education={resumeData.education}></EducationDetails>
            }
        </>
    );
}