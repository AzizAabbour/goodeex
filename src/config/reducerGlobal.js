const initialState = {
  bmr: 1800,
  tdee: 2000,
  activities: []
};

const reducerGlobal = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BMR":
      return {
        ...state,
        bmr: action.payload,
      };
    case "SET_ACTIVITIES_LEVELS":
      return {
        ...state,
        activities: action.payload,
      };
    case "SET_TDEE":
      return {
        ...state,
        tdee: action.payload,
      };
    default:
      return state;
  }
};


export default reducerGlobal;
