import { useState } from 'react';
import ResumeContext from './ResumeContext';
import PropTypes from 'prop-types';
import useResume from '../../hooks/useResume';

const initialState = {
    tagFilters: [],
    mustConatainAllTags: true,
};

const ResumeProvider = ({ children }) => {
    const [resumeContextData, setResumeContextData] = useState(initialState);
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
            experienceDispatch 
        } = useResume();

    return (
        <ResumeContext.Provider 
        value={{ 
                resumeContextData, 
                setResumeContextData,
                userState, 
                educationState, 
                projectState, 
                referenceState, 
                experienceState, 
                userDispatch,
                educationDispatch, 
                projectDispatch, 
                referenceDispatch, 
                experienceDispatch 
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

ResumeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ResumeProvider;
