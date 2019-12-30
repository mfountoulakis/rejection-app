import { describe } from 'riteway';
import { put, call } from 'redux-saga/effects';
import {
  handleFetchQuestions,
  handleCreateQuestion,
  handleToggleDarkMode
} from './questions-saga';
import {
  getState,
  createQuestion,
  questionSuccess,
  questionsReceived,
  reportsaveStateError,
  toggleDarkModeSuccess
} from './questions-reducer';
import { loadState, saveState } from '../../lib/localStorage';
import { select } from 'redux-saga/effects';

describe('watchFetchQuestions()', async assert => {
  const gen = handleFetchQuestions();

  assert({
    given: 'fetchQuestions() is called',
    should: 'dispatch an action questions/questionsReceived',
    actual: gen.next().value,
    expected: call(loadState)
  });

  assert({
    given: 'gen.next()',
    should: 'dispatch an action questions/questionSuccess',
    actual: gen.next().value,
    /** Todo: Refactor so we're not manually */
    expected: put(questionsReceived(undefined))
  });

  assert({
    given: 'gen.next()',
    should: 'the generator should return done',
    actual: gen.next(),
    expected: { done: true, value: undefined }
  });
});

describe('watchCreateQuestion()', async assert => {
  const action = {
    payload: {
      askee: 'anonymous',
      status: 'unanswered',
      question: 'Can I have a raise?',
      timestamp: 1575959095293,
      id: 'ck3zhcsfx000d3h5wt6b5oufd'
    },
    type: createQuestion().type
  };
  const gen = handleCreateQuestion(action);

  assert({
    given: 'handleCreateQuestion() is called',
    should: 'yield a selector with getState() result',
    actual: gen.next().value,
    expected: select(getState)
  });

  assert({
    given: 'gen.next()',
    should: 'yield a call to saveState()',
    actual: gen.next('state').value,
    expected: call(saveState, 'state')
  });

  assert({
    given: 'gen.next()',
    should: 'dispatch an action questionSuccess',
    actual: gen.next(undefined).value,
    expected: put(questionSuccess())
  });

  assert({
    given: 'gen.next()',
    should: 'the generator should return done',
    actual: gen.next(),
    expected: { done: true, value: undefined }
  });
});

describe('watchCreateQuestion() executes with error', async assert => {
  const gen = handleCreateQuestion();
  const error = new Error('Save Error');

  gen.next();
  assert({
    given: 'handleCreateQuestion() is called',
    should: 'yield a selector with getQuestionsObj() result',
    actual: gen.throw(error).value,
    expected: put({
      type: reportsaveStateError().type,
      payload: error
    })
  });
});

describe('watchToggleDarkMode()', async assert => {
  const gen = handleToggleDarkMode();

  assert({
    given: 'handleToggleDarkMode() is called',
    should: 'yield a selector with getState() result',
    actual: gen.next().value,
    expected: select(getState)
  });

  assert({
    given: 'gen.next()',
    should: 'yield a call to saveState()',
    actual: gen.next('state').value,
    expected: call(saveState, 'state')
  });

  assert({
    given: 'gen.next()',
    should: 'dispatch an action toggleDarkModeSuccess',
    actual: gen.next(undefined).value,
    expected: put(toggleDarkModeSuccess())
  });

  assert({
    given: 'gen.next()',
    should: 'the generator should return done',
    actual: gen.next(),
    expected: { done: true, value: undefined }
  });
});

describe('watchToggleDarkMode() executes with error', async assert => {
  const gen = handleCreateQuestion();
  const error = new Error('Save Error');

  gen.next();
  assert({
    given: 'handleCreateQuestion() is called',
    should: 'yield a selector with getQuestionsObj() result',
    actual: gen.throw(error).value,
    expected: put({
      type: reportsaveStateError().type,
      payload: error
    })
  });
});
