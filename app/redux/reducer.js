
const initialState = {
    user: null,
  }
  
  export default (state = initialState, action) => {
    switch(action.type) {
      case 'loginuser':
        return {
          ...state, //copy all previous states
          user: action.payload,
        }
      case 'logoutuser':
        return {
          user: null,
        }
      default:
        return state;
    }
  }
  
  