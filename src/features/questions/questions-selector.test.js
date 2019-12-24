import { describe } from 'riteway';
import { reducer, createQuestion } from './questions-reducer.js';

import { calculateTotals } from './questions-selector';

// describe('getViewState()', async assert => {
//   const questions = [
//     createQuestion({
//       question: 'can I have a raise',
//       askee: 'my boss',
//       status: 'accepted',
//       id: '123',
//       timestamp: 1574543711293
//     }),
//     createQuestion({
//       question: 'can I have a raise',
//       askee: 'my boss',
//       status: 'accepted',
//       id: '124',
//       timestamp: 1574543711293
//     })
//   ];

//   const state = questions.reduce(reducer, reducer());

//   assert({
//     given: 'a question',
//     should: 'add the question to state',
//     actual: calculateTotals(state),
//     expected: {
//       pointTotal: 2
//     }
//   });
// });
