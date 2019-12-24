//Question/new
// import { useRouter } from 'next/router';
import Layout from '../../../features/layout/layout-component';
import QuestionForm from '../../../features/question-form';
import { compose } from 'redux';

export default compose(Layout)(QuestionForm);
