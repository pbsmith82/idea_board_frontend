export function fetchIdeas() {
    return (dispatch) => {   
        dispatch({ type: 'LOADING_IDEAS'})     
        fetch('http://localhost:3000/ideas')
        .then(response => response.json())
        .then(ideas => dispatch({
            type: 'FETCH_IDEAS',
            payload: ideas.data
            }
           
        ))
    }
}