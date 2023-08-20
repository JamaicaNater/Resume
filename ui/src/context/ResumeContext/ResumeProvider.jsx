import { useState } from 'react';
import ResumeContext from './ResumeContext';
import PropTypes from 'prop-types';
import useResume from '../../hooks/useResume';

const ResumeProvider = ({ children }) => {
    const [tagFilters, setTagFilters] = useState([]);

    const { 
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
                tagFilters, 
                setTagFilters,
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
