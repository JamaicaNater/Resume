import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const NoBordersTable = ({title, head, body}) => {
  const tableStyle = {
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    borderBottom: 'none',
  };

  return (
    <>
      {
        title && 
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      }
      <Table style={tableStyle}>
        {
          head &&
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Occupation</TableCell>
            </TableRow>
          </TableHead>
        }
        {
          body &&
          <TableBody>
          { 
            Object.keys(body).map((key) => (
              <TableRow key={key}>
                <TableCell style={cellStyle}>{key}</TableCell>
                <TableCell style={cellStyle}>{body[key]}</TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        }
      </Table>
    </>
  );
};

NoBordersTable.propTypes = {
  body: PropTypes.node.isRequired,
  head: PropTypes.node,
  title: PropTypes.node,
};

export default NoBordersTable;
