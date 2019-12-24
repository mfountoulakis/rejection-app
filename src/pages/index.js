import Layout from '../features/layout/layout-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createQuestion } from '../features/questions/questions-reducer';
import Questions from '../features/questions/index';
import { compose } from 'redux';
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createQuestion
    },
    dispatch
  );

const connectedQuestions = connect(null, mapDispatchToProps);

export default compose(connectedQuestions, Layout)(Questions);
