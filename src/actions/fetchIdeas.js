import API_BASE_URL from '../config/api'

export function fetchIdeas() {
    return (dispatch) => {   
        dispatch({ type: 'LOADING_IDEAS'})     
        fetch(`${API_BASE_URL}/ideas`)
        .then(response => response.json())
        .then(ideas => dispatch({
            type: 'FETCH_IDEAS',
            payload: ideas.data
            }
           
        ))
    }
}