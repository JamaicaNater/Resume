import { PropTypes } from "prop-types"
import { useContext } from "react"
import ResumeContext from "../../../context/ResumeContext/ResumeContext"
import TagsDisplay from "./TagsDisplay"


const TagsFilter = ({ skills }) => {
    const { tagFilters, setTagFilters } = useContext(ResumeContext)

    return (
        <TagsDisplay skills={skills} tagsSelected={tagFilters} setTagsSelected={setTagFilters}/>
    );
}

TagsFilter.propTypes = {
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default TagsFilter