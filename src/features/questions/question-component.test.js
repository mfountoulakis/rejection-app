import React from 'react';
import render from 'riteway/render-component';
import { describe } from 'riteway';
import Question from './question-component';

describe('Question Component', async assert => {
  const props = {
    askee: 'Random Stranger',
    status: 'unanswered',
    question: 'Can I borrow 100 dollars?',
    timestamp: 1577416973089,
    id: 'ck4nlc65d00063h5uzgiyy5xl'
  };

  const createQuestion = props => render(<Question {...props} />);
  const $ = createQuestion(props);

  {
    assert({
      given: 'a question',
      should: 'render the questions question prop',
      actual: $('.question-prop')
        .html()
        .trim(),
      expected: 'Can I borrow 100 dollars?'
    });
  }

  {
    assert({
      given: 'a question askee',
      should: 'render the questions askee prop ',
      actual: $('.question-askee-prop')
        .html()
        .trim(),
      expected: 'Random Stranger'
    });
  }
  {
    assert({
      given: 'a question status',
      should: 'render the question status prop',
      actual: $('.question-status-prop')
        .html()
        .trim(),
      expected: 'unanswered'
    });
  }
  {
    assert({
      given: 'a question timestamp',
      should: 'render the question timestamp prop',
      actual: $('.question-timestamp-prop')
        .html()
        .trim(),
      expected: '12/26/2019'
    });
  }
});
