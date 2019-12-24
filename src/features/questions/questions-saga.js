import { all, put, takeEvery, call } from 'redux-saga/effects';
import { loadQuestions, saveQuestions } from '../../lib/localStorage';
import {
  questionsReceived,
  fetchQuestions,
  getQuestionsList,
  updateStatus,
  createQuestion,
  questionSuccess,
  questionError,
  reportSaveQuestionsError
} from './questions-reducer';
import { select } from 'redux-saga/effects';

export function* handleCreateQuestion() {
  try {
    const questions = yield select(getQuestionsList);
    yield call(saveQuestions, questions);
    yield put(questionSuccess());
  } catch (error) {
    yield put(reportSaveQuestionsError(error));
  }
}

export function* handleFetchQuestions() {
  try {
    const questions = yield call(loadQuestions);
    yield put(questionsReceived(questions));
  } catch (error) {
    yield put(questionError(error));
  }
}

export function* handleUpdateQuestion() {
  try {
    const questions = yield select(getQuestionsList);
    yield call(saveQuestions, questions);
    yield put(questionSuccess());
  } catch (error) {
    yield put(reportSaveQuestionsError(error));
  }
}

export function* watchUpdateQuestion() {
  yield takeEvery(updateStatus().type, handleUpdateQuestion);
}

export function* watchCreateQuestion() {
  yield takeEvery(createQuestion().type, handleCreateQuestion);
}

export function* watchFetchQuestions() {
  yield takeEvery(fetchQuestions().type, handleFetchQuestions);
}

export default function* rootSaga() {
  yield all([
    watchCreateQuestion(),
    watchFetchQuestions(),
    watchUpdateQuestion()
  ]);
}
