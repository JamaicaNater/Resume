import { useState } from 'react';
import ResumeContext from './ResumeContext';
import PropTypes from 'prop-types';
import useResume from '../../hooks/useResume';

const initialState = {
    tagFilters: [],
    mustConatainAllTags: true,
};

const ResumeProvider = ({ children }) => {
    const [tagFilterData, setTagFilterData] = useState(initialState);
    const { 
            userState, 
            educationState, 
            projectState, 
            referenceState, 
            experienceState, 
            userDispatch,
            educationDispatch, 
            projectDispatch, 
            referenceDispatch, 
            experienceDispatch,
            user,
            projects,
            education,
            experience,
            references,
            tags,
            jobs,
        } = useResume();

    return (
        <ResumeContext.Provider 
        value={{ 
                tagFilterData, 
                setTagFilterData,
                userState, 
                educationState, 
                projectState, 
                referenceState, 
                experienceState, 
                userDispatch,
                educationDispatch, 
                projectDispatch, 
                referenceDispatch, 
                experienceDispatch,
                user,
                projects,
                education,
                experience,
                references,
                tags,
                jobs,
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

ResumeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ResumeProvider;
