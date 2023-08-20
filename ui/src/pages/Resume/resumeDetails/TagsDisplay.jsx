import { Chip } from "@mui/material"
import { PropTypes } from "prop-types"

const TagsDisplay = ({ tags, tagsSelected, setTagsSelected }) => { 
    const formatTag = (input) => {
        const wordsArray = input.split(/-/);
    
        const capitalizedWords = wordsArray.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
        return capitalizedWords;
    }

    const tagSelected = (tag) => {
        return tagsSelected.includes(tag)
    }

    const selectTag = (tag) => {
        console.log('here')
        setTagsSelected([...tagsSelected, tag])
    }

    const unselectTag = (removed_tag) => {
        const newTagFilters = tagsSelected.filter((tag) => tag !== removed_tag);
        setTagsSelected(newTagFilters);
    };

    const handleClipClick = (tag) => {
        if (tagSelected(tag)) {
            unselectTag(tag)
        } else {
            selectTag(tag);
        }
    }

    return (
        <>
        {
            tags.map((skill, index) => (
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
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    tagsSelected: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTagsSelected: PropTypes.func.isRequired
}

export default TagsDisplay