export function fetchIdea() {
    return (dispatch) => {   
        dispatch({ type: 'LOADING_IDEA'})     
        fetch('http://localhost:8080/ideas')
        .then(response => response.json())
        .then(ideas => dispatch({
            type: 'FETCH_IDEA',
            payload: ideas.data
            }
           
        ))
    }
}