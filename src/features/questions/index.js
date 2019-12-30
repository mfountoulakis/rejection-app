import React from 'react';
import Questions from './questions-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createQuestion,
  fetchQuestions,
  getQuestions,
  updateStatus,
  calculateTotals,
  toggleTheme
} from './questions-reducer';

const mapStateToProps = state => {
  return {
    questions: getQuestions(state),
    score: calculateTotals(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createQuestion,
      fetchQuestions,
      updateStatus
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => <Questions {...props} />);
