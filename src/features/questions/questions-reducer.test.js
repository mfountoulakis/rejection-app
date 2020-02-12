import { describe } from 'riteway';

import {
  reducer,
  createQuestion,
  updateStatus,
  calculateTotals,
  getQuestionsObj,
  toggleDarkMode,
  getState,
  filterQuestions,
  getQuestions
} from './questions-reducer.js';
// import { getDate } from '../../lib/date.js';

//basic react hook, why react? advantage of hooks over classbased components...
// It's fine for this to know the state shape.
const createState = ({
  questions = { filterBy: 'all', byId: {}, darkMode: true }
} = {}) => ({
  ...questions
});

//SELECTORS----------------------------------//

describe('calculateTotals()', async assert => {
  const questions = [
    {
      question: 'can I have a raise',
      askee: 'my boss',
      status: 'accepted',
      id: '123',
      timestamp: 1574543711293
    },
    {
      question: 'can I have a raise',
      askee: 'my boss',
      status: 'unanswered',
      id: '124',
      timestamp: 1574543711293
    }
  ];

  const state = {
    questions: questions.map(createQuestion).reduce(reducer, reducer())
  };

  assert({
    given: 'the state',
    should: 'calculate the total score',
    actual: calculateTotals(state),
    expected: 1
  });
});

describe('getQuestions()', async assert => {
  const questions = [
    {
      question: 'can I have a raise',
      askee: 'my boss',
      status: 'accepted',
      id: '123',
      timestamp: 1574543711293
    },
    {
      question: 'can I have a raise',
      askee: 'my boss',
      status: 'unanswered',
      id: '124',
      timestamp: 1574543711293
    }
  ];

  const state = {
    questions: questions.map(createQuestion).reduce(reducer, reducer())
  };

  assert({
    given: 'the state',
    should: 'calculate the total score',
    actual: getQuestions(state).length,
    expected: 2
  });

  // const filterState = reducer(state.questions, filterQuestions('accepted'));

  // console.log("FilteredState:", filterState);

  // assert({
  //   given: 'the state with filterBy prop',
  //   should: 'calculate the total score',
  //   actual: getQuestions(filterState).length,
  //   expected: 1
  // });
});

//--------------------------------------//

describe('questions reducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return the valid default state',
    actual: reducer(),
    expected: createState()
  });
});

describe('questions received', async assert => {
  const questions = [
    {
      question: 'can I have a raise',
      askee: 'my boss',
      status: 'unanswered',
      id: '123',
      timestamp: 1574543711293
    },
    {
      question: 'can I have a raise',
      askee: 'my boss',
      status: 'unanswered',
      id: '124',
      timestamp: 1574543711293
    }
  ];

  const state = questions.map(createQuestion).reduce(reducer, reducer());

  assert({
    given: 'an array of questions',
    should: 'return the array of question-objects keyed by id',
    actual: getQuestionsObj(state),
    expected: {
      '123': {
        question: 'can I have a raise',
        askee: 'my boss',
        status: 'unanswered',
        id: '123',
        timestamp: 1574543711293
      },
      '124': {
        question: 'can I have a raise',
        askee: 'my boss',
        status: 'unanswered',
        id: '124',
        timestamp: 1574543711293
      }
    }
  });
});

describe('create question', async assert => {
  const question = {
    askee: 'my boss',
    status: 'unanswered',
    question: 'can I have a raise',
    timestamp: 1574543711293,
    id: '123'
  };

  const state = reducer(reducer(), createQuestion(question));

  assert({
    given: 'a question',
    should: 'add the question to state',
    actual: getQuestionsObj(state),
    expected: { [question.id]: question }
  });
});

describe('update question status', async assert => {
  const question = {
    question: 'can I have a raise',
    askee: 'my boss',
    status: 'unanswered',
    id: '123',
    timestamp: 1574543711293
  };

  const initialState = reducer(reducer(), createQuestion(question));

  assert({
    given: 'a question that has been accepted',
    should: 'update the question status to accepted',
    actual: getQuestionsObj(
      reducer(initialState, updateStatus(question.id, 'accepted'))
    ),
    expected: {
      123: {
        askee: 'my boss',
        status: 'accepted',
        question: 'can I have a raise',
        timestamp: 1574543711293,
        id: '123'
      }
    }
  });
});

describe('toggleDarkMode()', async assert => {
  const state = reducer(reducer(), toggleDarkMode());
  assert({
    given: 'darkMode has been toggled from true to false',
    should: 'update darkMode property to false',
    actual: getState(state).darkMode,
    expected: false
  });
});

describe('filterQuestions()', async assert => {
  const state = reducer(reducer(), filterQuestions('unanswered'));

  assert({
    given: 'it is called with an argument',
    should: 'update filterBy prop with argument',
    actual: getState(state).filterBy,
    expected: 'unanswered'
  });
});
