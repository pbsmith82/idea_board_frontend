export default function ideaReducer(state = {ideas:[], loading: false, components:[]}, action) {
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
    
    case 'ADD_COMMENT':
        let newComment = state.ideas.map(idea => {
            console.log(idea.id)
            console.log(action.payload.id)
            if (idea.id === action.payload.id) {
                idea.attributes = action.payload.attributes
                console.log(idea.attributes)
            return action.payload
            } else {
            return idea
            }
        })    
        return {...state, ideas: newComment}

    case 'ADD_LIKE':
        console.log(state)
        console.log(action.payload)
        let newLike = state.ideas.map(idea => {
            if (idea.id === action.payload.id) {
                idea.attributes = action.payload.attributes
            return action.payload
            } else {
            return idea
            }
        })    
        return {...state, ideas: newLike}

    case 'LOADING_COMPONENTS':
        console.log(action.payload)
            return {
             ...state,
             components: [...state.components],
             loading: true
            }
     case'FETCH_COMPONENTS':
         return {
             ...state,
             components: action.payload,
             loading: false
         }
    
    
    default:
        return state
    }
}