const ideasReducer = (state = { ideas: [], loading: false }, action) => {
    switch(action.type) {
      case 'LOADING_IDEAS':
        return {
          ...state,
          ideas: [...state.ideas],
          loading: true
        }
      case 'ADD_IDEAS':
        return {
          ...state,
          ideas: action.ideas,
          loading: false
        }
      default:
        return state;
    }
  }
  
  export default ideasReducer;