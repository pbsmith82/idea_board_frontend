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

    case 'UPDATE_IDEA':
        let updatedIdeas = state.ideas.map(idea => {
            if (idea.id === action.payload.id) {
            return action.payload
            } else {
            return idea
            }
        })    
        return {...state, ideas: updatedIdeas}
    
    default:
        return state
    }
}