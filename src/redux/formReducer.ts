const INITIAL_STATE = {
    formData: {},
  };
  
  const formReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case 'SET_FORM_DATA':
        return {
          ...state,
          formData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default formReducer;