import API_BASE_URL from '../config/api'

export function fetchComponents() {
    return (dispatch) => {   
        dispatch({ type: 'LOADING_COMPONENTS'})     
        fetch(`${API_BASE_URL}/components`)
        .then(response => response.json())
        .then(components => dispatch({
            type: 'FETCH_COMPONENTS',
            payload: components.data
            }, console.log(components)
           
        ))
    }
}