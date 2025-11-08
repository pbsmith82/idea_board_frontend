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
        let newLike = state.ideas.map(idea => {
            // Compare IDs as strings to handle both string and number IDs
            if (String(idea.id) === String(action.payload.id)) {
                return action.payload
            } else {
                return idea
            }
        })    
        return {...state, ideas: newLike}

    case 'ADD_DISLIKE':
        let newDislike = state.ideas.map(idea => {
            // Compare IDs as strings to handle both string and number IDs
            if (String(idea.id) === String(action.payload.id)) {
                return action.payload
            } else {
                return idea
            }
        })    
        return {...state, ideas: newDislike}

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

    case 'ADD_COMPONENT':
        return {
            ...state,
            components: [...state.components, action.payload]
        }

    case 'UPDATE_COMPONENT':
        let updatedComponents = state.components.map(component => {
            if (String(component.id) === String(action.payload.id)) {
                return action.payload
            } else {
                return component
            }
        })
        return {
            ...state,
            components: updatedComponents
        }

    case 'DELETE_COMPONENT':
        let filteredComponents = state.components.filter(component => 
            String(component.id) !== String(action.payload)
        )
        return {
            ...state,
            components: filteredComponents
        }
    
    
    default:
        return state
    }
}