import { useState } from 'react';
import { Card, CardContent, Collapse, Typography, IconButton, Divider } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { PropTypes } from 'prop-types';

const CollapsibleCard = ({ title, children, defaultExpandedState, className }) => {
  const [expanded, setExpanded] = useState(defaultExpandedState ?? true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={className}>
        <Typography variant="h5" sx={{marginTop: '1rem'}}>{title}</Typography>
        {expanded && <Divider sx={{borderBottomWidth: '2px', backgroundColor: '#C0C0C0'}}></Divider>}
        <Collapse in={!expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography variant="body1">Expand to view content</Typography>
            </CardContent>
            <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{ marginLeft: 'auto' }}
            >
                {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
        </Collapse>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            {children}
            </CardContent>
            <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{ marginLeft: 'auto' }}
            >
                {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
        </Collapse>
    </Card>
  );
};

CollapsibleCard.propTypes = {
    children : PropTypes.node.isRequired,
    className: PropTypes.string,
    defaultExpandedState: PropTypes.bool,
    title: PropTypes.string
}

export default CollapsibleCard;