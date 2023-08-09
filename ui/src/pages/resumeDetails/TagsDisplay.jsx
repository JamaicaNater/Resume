import { Chip } from "@mui/material"
import { PropTypes } from "prop-types"
import './TagsDisplay.css'

const SkillsDisplay = ({ skills }) => {
    return (
        <>
        {
            skills.map((skill, index) => (
                <Chip className='chip' key={index} label={skill} />
            ))
        }
        </>
    )
}
SkillsDisplay.propTypes = {
    skills: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default SkillsDisplay