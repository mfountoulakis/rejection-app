import { describe } from 'riteway';

import { reducer, createQuestion } from './questions-reducer.js';

const createState = () => [];

describe('questions reducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return the valid default state',
    actual: reducer(),
    expected: createState()
  });
});

describe('create question', async assert => {
  const question = {
    question: 'can I have a raise',
    askee: 'my boss',
    status: 'Unanswered',
    id: '123'
  };

  assert({
    given: 'a question',
    should: 'add the question to state',
    actual: reducer(reducer(), createQuestion(question)),
    expected: [question]
  });
});
