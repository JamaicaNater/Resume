import { ResumeTemplate, Education, Project, Experience, Reference, User } from "../models";
import { plainToClass } from 'class-transformer';
import { ApiController } from "../utils/api";
import { useEffect, useState } from "react";

export default function Resume() {
    const [data, setData] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
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
                console.log(resumeTemplate)
                setData(resumeTemplate)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);

    return(
        <>
            {JSON.stringify(data)}
        </>
    );
}