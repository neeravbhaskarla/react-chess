import boardActionTypes from 'constants/boardActionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case boardActionTypes.RESET:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
