import { useState } from 'react';
import ResumeContext from './ResumeContext';
import PropTypes from 'prop-types';

const initialState = {
    tagFilters: [],
    mustConatainAllTags: true,
};

const ResumeProvider = ({ children }) => {
    const [resumeContextData, setResumeContextData] = useState(initialState);

    return (
        <ResumeContext.Provider value={{ resumeContextData, setResumeContextData }}>
            {children}
        </ResumeContext.Provider>
    );
};

ResumeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ResumeProvider;
