import { Chip } from "@mui/material"
import { PropTypes } from "prop-types"


const TagsDisplay = ({ skills }) => {
    const formatTag = (input) => {
        const wordsArray = input.split(/-/);
    
        const capitalizedWords = wordsArray.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
        return capitalizedWords;
    }

    const handleClipClick = (tag) => {
        console.log("Chip clicked " + tag);
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