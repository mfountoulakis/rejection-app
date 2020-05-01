import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { ListItem, ListItemAvatar, Avatar } from '@material-ui/core';

const Question = ({
  askee,
  question,
  id,
  status,
  timestamp,
  updateStatus,
  account
} = {}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = id => status => {
    setAnchorEl(null);
    updateStatus(id, status);
  };

  return (
    <>
      <TableCell align="right">
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Profile Picture" />
          </ListItemAvatar>
          <span>Anonymous</span>
        </ListItem>
      </TableCell>
      <TableCell align="right">
        <div className="question-askee-prop">{askee}</div>
      </TableCell>
      <TableCell align="right">
        <div className="question-prop">{question}</div>
      </TableCell>
      <TableCell align="right">
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <div className="question-status-prop">{status}</div>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              className="accept-question-button"
              onClick={() => handleClose(id)('accepted')}
            >
              Accept Question
            </MenuItem>
            <MenuItem
              className="reject-question-button"
              onClick={() => handleClose(id)('rejected')}
            >
              Reject Question
            </MenuItem>
          </Menu>
        </div>
      </TableCell>
      <TableCell align="right">
        <div className="question-timestamp-prop">
          {new Date(timestamp).toLocaleDateString('en-US')}
        </div>
      </TableCell>
    </>
  );
};

Question.propTypes = {
  id: PropTypes.string,
  account: PropTypes.string,
  question: PropTypes.string,
  status: PropTypes.string,
  askee: PropTypes.string,
  props: PropTypes.object,
  timestamp: PropTypes.number,
  fetchQuestions: PropTypes.func,
  createQuestion: PropTypes.func,
  updateStatus: PropTypes.func
};

export default Question;
