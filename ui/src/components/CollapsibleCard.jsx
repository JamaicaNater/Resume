import React, { useState } from 'react';
import { Card, CardContent, Collapse, Typography, IconButton } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const CollapsibleCard = ({ title, content, hidden_content }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
      <IconButton
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        sx={{ marginLeft: 'auto' }}
      >
        <ExpandMore />
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">{hidden_content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CollapsibleCard;