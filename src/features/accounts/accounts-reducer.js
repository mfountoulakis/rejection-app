export const authStateChanged = accounts => ({
  type: 'accounts/authStateChanged',
  payload: accounts
});

export const reducer = (state = { accounts: [] }, { type, payload }) => {
  switch (type) {
    case authStateChanged().type:
      return {
        ...state,
        accounts: payload
      };
    default:
      return state;
  }
};
