const inititalState = {
  currentPage: 'HomeFeed',
  theme: 'light',
  prefs: {uiStyle: 1},
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.payload.theme,
      };
    case 'SET_CURRENT_PAGE':
      console.log('SET_CURRENT_PAGE', action);
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};
