export const loadQuestions = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [undefined];
  }
};

export const saveQuestions = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log('localstorage save error ', err);
    // Ignore write errors.
  }
};
