import { Typography } from "@mui/material"
import { PropTypes } from "prop-types"

const DetailsDisplay = ({ details }) => {
    const typographyStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
      };

    return (
        <Typography>
            <Typography variant="body" style={typographyStyle}>Summary</Typography>
        {
            details.map((detail, index) => (
                <Typography key={index}>{detail}</Typography>
            ))
        }
        </Typography>
    );
}

DetailsDisplay.propTypes = {
    details: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default DetailsDisplay;