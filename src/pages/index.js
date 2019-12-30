import Layout from '../features/layout/layout-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createQuestion,
  filterQuestions,
  toggleDarkMode,
  getThemePreference
} from '../features/questions/questions-reducer';
import Questions from '../features/questions/index';
import { compose } from 'redux';

const mapStateToProps = state => {
  return {
    darkMode: getThemePreference(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createQuestion,
      filterQuestions,
      toggleDarkMode
    },
    dispatch
  );

const connectedQuestions = connect(mapStateToProps, mapDispatchToProps);

export const withQuestions = component =>
  compose(connectedQuestions, Layout)(component);

export default compose(connectedQuestions, Layout)(Questions);
