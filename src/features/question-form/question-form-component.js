import React, { useState } from 'react';
import t from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const QuestionForm = ({ createQuestion }) => {
  const [questionInput, setQuestion] = useState(undefined);
  const [askeeInput, setAskee] = useState(undefined);

  const handleSubmit = e => {
    e.preventDefault();
    createQuestion({ question: questionInput, askee: askeeInput });
  };

  const setter = set => e => {
    const { target } = e;
    const { value } = target;
    set(value);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={setter(setAskee)}
          value={askeeInput}
          fullWidth
          label="Askee"
        />
        <TextField
          onChange={setter(setQuestion)}
          value={questionInput}
          fullWidth
          label="Question"
        />
        <button type="submit">Submit Question</button>
      </form>
    </Paper>
  );
};

QuestionForm.propTypes = {
  createQuestion: t.func
};

export default QuestionForm;
