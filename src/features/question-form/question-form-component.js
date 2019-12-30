import React, { useState } from 'react';
import t from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      display: 'flex'
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1)
    }
  },

  paper: {
    padding: theme.spacing(1),
    height: '100%',
    position: 'fixed',
    overflow: 'hidden',
    width: '100%'
  }
}));

const QuestionForm = ({ createQuestion }) => {
  const classes = useStyles();

  const [questionInput, setQuestion] = useState();
  const [askeeInput, setAskee] = useState();
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    createQuestion({ question: questionInput, askee: askeeInput });
    //for now push to index route
    router.push(`/`);
  };

  const setter = set => e => {
    const { target } = e;
    const { value } = target;
    set(value);
  };

  return (
    <Paper className={classes.paper}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-multiline-flexible"
          label="Askee"
          value={askeeInput}
          onChange={setter(setAskee)}
          variant="outlined"
        />

        <TextField
          id="outlined-multiline-static"
          label="Question"
          multiline
          rows="20"
          variant="outlined"
          value={questionInput}
          onChange={setter(setQuestion)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

QuestionForm.propTypes = {
  createQuestion: t.func
};

export default QuestionForm;
