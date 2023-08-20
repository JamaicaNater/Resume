import { PropTypes } from "prop-types"
import { useContext } from "react"
import ResumeContext from "../../../context/ResumeContext/ResumeContext"
import TagsDisplay from "./TagsDisplay"


const TagsFilter = ({ tags }) => {
    const { tagFilters, setTagFilters } = useContext(ResumeContext)

    return (
        <TagsDisplay tags={tags} tagsSelected={tagFilters} setTagsSelected={setTagFilters}/>
    );
}

TagsFilter.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default TagsFilter