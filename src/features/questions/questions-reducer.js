import cuid from 'cuid';
import { combineReducers } from 'redux';

export const questionSuccess = payload => ({
  type: 'questions/questionSuccess',
  action: payload
});

export const toggleDarkModeSuccess = payload => ({
  type: 'questions/toggleDarkModeSuccess',
  action: payload
});

export const reportsaveStateError = error => ({
  type: 'questions/reportsaveStateError',
  payload: error
});

export const questionError = payload => ({
  type: 'questions/questionError',
  action: payload
});

export const fetchQuestions = () => ({
  type: 'questions/fetchQuestions',
  payload: 'isFetching'
});

export const questionsReceived = questions => ({
  type: 'questions/questionsReceived',
  payload: questions
});

export const questionReceived = question => ({
  type: 'questions/questionReceived',
  payload: question
});

export const filterQuestions = filter => ({
  type: 'questions/filterQuestions',
  payload: filter
});

export const toggleDarkMode = theme => ({
  type: 'questions/toggleTheme',
  payload: theme
});

export const createQuestion = ({
  askee = 'anonymous',
  status = 'unanswered',
  question = 'Can I have a raise?',
  timestamp = Date.now(),
  id = cuid()
} = {}) => ({
  type: 'questions/createQuestion',
  payload: { askee, status, question, timestamp, id }
});

export const updateStatus = (id, status) => ({
  type: 'questions/updateStatus',
  payload: { id, status }
});

// as an object

//SELECTORS----------------------------------//
export const getState = state => state.questions;

export const getQuestionsObj = state => state.questions.byId;

export const getQuestionsArray = state => Object.values(state.questions.byId);

export const getThemePreference = state => state.questions.darkMode;
//Tests should be using selectors, so there's no need to change tests if the state shape changes.
// as an array

export const getQuestions = state =>
  state.questions.filterBy === 'all'
    ? getQuestionsArray(state)
    : getQuestionsArray(state).filter(
        q => q.status === state.questions.filterBy.toLowerCase()
      );

export const pointValues = {
  accepted: 1,
  rejected: 10,
  unanswered: 0
};

export const calculateTotals = state => {
  return getQuestionsArray(state).reduce(
    (acc, question) => (acc += pointValues[question.status]),
    0
  );
};

//SELECTORS----------------------------------//

const questions = (
  state = { filterBy: 'all', byId: {}, darkMode: true },
  { type, payload } = {}
) => {
  switch (type) {
    case toggleDarkMode().type:
      return {
        ...state,
        darkMode: !state.darkMode
      };
    case filterQuestions().type:
      return {
        ...state,
        filterBy: payload
      };
    case questionsReceived().type:
      return { ...state, ...payload };
    case createQuestion().type:
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: { ...payload } }
      };
    case updateStatus().type:
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.id]: { ...state.byId[payload.id], ...payload }
        }
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  questions
});

export default reducer;
