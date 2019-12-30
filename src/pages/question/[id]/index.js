// import React from 'react';
// import { useRouter } from 'next/router';
import Questions from '../../../features/questions/index';
import { withQuestions } from '../../index';
import { compose } from 'redux';

export default compose(withQuestions)(Questions);
