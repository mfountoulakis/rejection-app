import React from 'react';
import PropTypes from 'prop-types';

import { ListItemText } from '@material-ui/core';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';

const Question = ({ props }) => {
  const router = useRouter();

  const { askee, question, id } = props;
  return (
    <ListItemText
      onClick={() => router.push(`/question/${id}`)}
      primary={askee}
      secondary={
        <React.Fragment>
          <Typography component="span" variant="body2" color="textPrimary">
            Anon
          </Typography>
          {' — ' + question}
        </React.Fragment>
      }
    />
  );
};

Question.propTypes = {
  id: PropTypes.number,
  timestamp: PropTypes.instanceOf(Date),
  question: PropTypes.string,
  status: PropTypes.string,
  askee: PropTypes.string,
  props: PropTypes.object,
  fetchQuestions: PropTypes.func,
  createQuestion: PropTypes.func
};

export default Question;
