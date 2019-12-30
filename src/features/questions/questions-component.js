import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Question from './question-component';

const Questions = ({ fetchQuestions, score, questions, updateStatus } = {}) => {
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <caption className={'questions-total-score'}>
          Total Score: {score}
        </caption>

        <TableHead>
          <TableRow>
            <TableCell align="left">From</TableCell>
            <TableCell align="right">Askee</TableCell>
            <TableCell align="right">Question</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Date Created</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {questions.map(q => (
            <TableRow className="question-row" key={q.id}>
              <Question
                {...q}
                updateStatus={(id, status) => updateStatus(id, status)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Questions.propTypes = {
  today: PropTypes.arrayOf(PropTypes.object),
  questions: PropTypes.array,
  fetchQuestions: PropTypes.func,
  createQuestion: PropTypes.func,
  updateStatus: PropTypes.func,
  score: PropTypes.number,
  id: PropTypes.string
};

export default Questions;
