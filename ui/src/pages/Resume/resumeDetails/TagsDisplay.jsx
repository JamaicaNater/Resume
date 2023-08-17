import { Chip } from "@mui/material"
import { PropTypes } from "prop-types"
import { useContext } from "react"
import ResumeContext from "../../../context/ResumeContext/ResumeContext"


const TagsDisplay = ({ skills }) => {
    const { tagFilterData, setTagFilterData } = useContext(ResumeContext);

    const formatTag = (input) => {
        const wordsArray = input.split(/-/);
    
        const capitalizedWords = wordsArray.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
        return capitalizedWords;
    }

    const tagSelected = (tag) => {
        return tagFilterData.tagFilters.includes(tag)
    }

    const addTagToFilter = (tag) => {
        const newTagFilters = [...tagFilterData.tagFilters, tag];
        setTagFilterData((prevData) => ({
            ...prevData,
            tagFilters: newTagFilters,
        }));
    }

    const removeTagFromFilter = (removed_tag) => {
        const newTagFilters = tagFilterData.tagFilters.filter((tag) => tag !== removed_tag);
        setTagFilterData((prevData) => ({
          ...prevData,
          tagFilters: newTagFilters,
        }));
    };

    const handleClipClick = (tag) => {
        if (tagSelected(tag)) {
            removeTagFromFilter(tag)
        } else {
            addTagToFilter(tag);
        }
    }

    return (
        <>
        {
            skills.map((skill, index) => (
                <Chip 
                        className='chip' 
                        key={index} 
                        label={formatTag(skill)} 
                        variant={ tagSelected(skill) ? "filled": "outlined" } 
                        onClick={() => handleClipClick(skill)} 
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