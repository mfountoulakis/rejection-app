import React from 'react';
import render from 'riteway/render-component';
import { describe } from 'riteway';
import Questions from './questions-component';

describe('Questions', async assert => {
  const questions = [
    {
      askee: 'Random Stranger',
      status: 'unanswered',
      question: 'Can I borrow 100 dollars?',
      timestamp: 1577416973089,
      id: 'ck4nlc65d00063h5uzgiyy5xl'
    },
    {
      askee: 'My Boss',
      status: 'unanswered',
      question: 'Can I have a raise?',
      timestamp: 1577417057571,
      id: 'ck4nldzc400073h5uf7naqaip'
    }
  ];

  const $ = render(<Questions questions={questions} score={12} />);
  {
    assert({
      given: 'some questions',
      should: 'render each question in a row',
      actual: $('.question-row').length,
      expected: 2
    });
  }
});
