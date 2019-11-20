export const createQuestion = ({ askee, status, question, id } = {}) => ({
  type: 'questions/createQuestion',
  payload: { askee, status, question, id }
});
export const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case createQuestion().type:
      return state.concat(action.payload);
    default:
      return state;
  }
};
