import { Chip } from "@mui/material"
import { PropTypes } from "prop-types"
import { useContext } from "react"
import ResumeContext from "../ResumeContext"


const TagsDisplay = ({ skills }) => {
    const resumeContextData = useContext(ResumeContext)

    const formatTag = (input) => {
        const wordsArray = input.split(/-/);
    
        const capitalizedWords = wordsArray.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
        return capitalizedWords;
    }

    const handleClipClick = (tag) => {
        resumeContextData.tagFilters.add(tag);
        console.log("Chip clicked ");
        console.log(resumeContextData.tagFilters);
    }

    return (
        <>
        {
            skills.map((skill, index) => (
                <Chip className='chip' key={index} label={formatTag(skill)} onClick={() => handleClipClick(skill)} 
                sx={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    marginRight: '.5rem'
                }}
                />
            ))
        }
        </>
    );
}

TagsDisplay.propTypes = {
    skills: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default TagsDisplay