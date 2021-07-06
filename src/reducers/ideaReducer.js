export default function ideaReducer(state = {ideas:[], loading: false}, action) {
   switch(action.type){
    case 'LOADING_IDEAS':
           return {
            ...state,
            ideas: [...state.ideas],
            loading: true
           }
    case'FETCH_IDEAS':
        return {
            ...state,
            ideas: action.payload,
            loading: false
        }
    case 'ADD_IDEA':
        return {...state, ideas: [...state.ideas, action.payload]}

    default:
        return state
    }
}