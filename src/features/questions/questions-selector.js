export const pointValues = {
  accepted: 1,
  rejected: 10,
  unanswered: 0
};

// I would split these into their own selectors.
export const calculateTotals = state => {
  return {
    pointTotal: state.questionsList.reduce(
      (acc, question) => (acc += pointValues[question.status]),
      0
    )
  };
};
