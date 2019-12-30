//Question/new
// import { useRouter } from 'next/router';
import QuestionForm from '../../../features/question-form';
import { withQuestions } from '../../index';

import { compose } from 'redux';

export default compose(withQuestions)(QuestionForm);
