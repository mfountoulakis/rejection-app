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

import { getWalletAddress } from '../accounts/accounts-reducer';

const mapStateToProps = state => {
  return {
    account: getWalletAddress(state),
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
