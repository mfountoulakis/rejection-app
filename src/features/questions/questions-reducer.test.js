import { describe } from 'riteway';

import { reducer, createQuestion, updateStatus } from './questions-reducer.js';

//basic react hook, why react? advantage of hooks over classbased components...
// It's fine for this to know the state shape.
const createState = ({ byId = {} } = {}) => ({
  byId
});

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
    actual: state.byId,
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
    actual: state.byId,
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
    actual: reducer(initialState, updateStatus(question.id, 'accepted')).byId,
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
