import cuid from 'cuid';
import { combineReducers } from 'redux';
import { isToday } from '../../lib/date';

export const questionSuccess = payload => ({
  type: 'questions/questionSuccess',
  action: payload
});

export const reportSaveQuestionsError = error => ({
  type: 'questions/reportSaveQuestionsError',
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

//SELECTORS----------------------------------//
export const updateStatus = (id, status) => ({
  type: 'questions/updateStatus',
  payload: { id, status }
});

// as an object
export const getQuestionsList = state => state.questions.byId;
//SELECTORS----------------------------------//

//Tests should be using selectors, so there's no need to change tests if the state shape changes.
// as an array
export const getQuestions = state => Object.values(state.questions.byId);

export const getTodaysQuestions = state =>
  getQuestions(state).map(q => {
    if (isToday(q.timestamp)) {
      return q;
    }
  });

const byId = (state = {}, { type, payload } = {}) => {
  switch (type) {
    case questionsReceived().type:
      return { ...state, ...payload };
    case createQuestion().type:
      return { ...state, [payload.id]: payload };
    case updateStatus().type:
      return {
        ...state,
        [payload.id]: { ...state[payload.id], ...payload }
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  byId
});

export default reducer;
