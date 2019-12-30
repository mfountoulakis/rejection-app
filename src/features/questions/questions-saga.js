import { all, put, takeEvery, call } from 'redux-saga/effects';
import { loadState, saveState } from '../../lib/localStorage';
import {
  questionsReceived,
  fetchQuestions,
  updateStatus,
  createQuestion,
  questionSuccess,
  questionError,
  reportsaveStateError,
  toggleDarkMode,
  getState,
  toggleDarkModeSuccess
} from './questions-reducer';
import { select } from 'redux-saga/effects';

export function* handleCreateQuestion() {
  try {
    const questions = yield select(getState);
    yield call(saveState, questions);
    yield put(questionSuccess());
  } catch (error) {
    yield put(reportsaveStateError(error));
  }
}

export function* handleFetchQuestions() {
  try {
    const questions = yield call(loadState);
    yield put(questionsReceived(questions));
  } catch (error) {
    yield put(questionError(error));
  }
}

export function* handleUpdateQuestion() {
  try {
    const state = yield select(getState);
    yield call(saveState, state);
    yield put(questionSuccess());
  } catch (error) {
    yield put(reportsaveStateError(error));
  }
}

export function* handleToggleDarkMode() {
  try {
    //save the entire serialized state
    const state = yield select(getState);
    yield call(saveState, state);
    yield put(toggleDarkModeSuccess());
  } catch (error) {
    yield put(reportsaveStateError(error));
  }
}

//handle filter

export function* watchUpdateQuestion() {
  yield takeEvery(updateStatus().type, handleUpdateQuestion);
}

export function* watchCreateQuestion() {
  yield takeEvery(createQuestion().type, handleCreateQuestion);
}

export function* watchFetchQuestions() {
  yield takeEvery(fetchQuestions().type, handleFetchQuestions);
}

export function* watchToggleDarkMode() {
  yield takeEvery(toggleDarkMode().type, handleToggleDarkMode);
}

export default function* rootSaga() {
  yield all([
    watchToggleDarkMode(),
    watchCreateQuestion(),
    watchFetchQuestions(),
    watchUpdateQuestion()
  ]);
}
