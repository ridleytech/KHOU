const inititalState = {
  currentPage: 'HomeFeed',
  prefs: {theme: 'light'},
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case 'CHANGE_UI':
      console.log('action', action);
      return {
        ...state,
        prefs: {
          ...state.prefs,
          theme: action.theme,
        },
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
