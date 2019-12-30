import React from 'react';
import QuestionForm from './question-form-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createQuestion } from '../questions/questions-reducer';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createQuestion
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(props => <QuestionForm {...props} />);
