import React from 'react';
import Questions from './questions-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createQuestion,
  fetchQuestions,
  getQuestions,
  getTodaysQuestions
} from './questions-reducer';

const mapStateToProps = state => {
  return { questions: getQuestions(state), today: getTodaysQuestions(state) };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createQuestion,
      fetchQuestions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => <Questions {...props} />);
