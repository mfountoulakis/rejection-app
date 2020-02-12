import WithLayout from '../hoc/with-layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createQuestion,
  filterQuestions,
  toggleDarkMode,
  getThemePreference
} from '../features/questions/questions-reducer';
import { authStateChanged } from '../features/accounts/accounts-reducer';
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
      toggleDarkMode,
      authStateChanged
    },
    dispatch
  );

const connectedQuestions = connect(mapStateToProps, mapDispatchToProps);

export const withQuestions = component =>
  compose(connectedQuestions, WithLayout)(component);

export default compose(withQuestions)(Questions);
