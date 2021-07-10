export function fetchComponents() {
    return (dispatch) => {   
        dispatch({ type: 'LOADING_COMPONENTS'})     
        fetch('http://localhost:8080/components')
        .then(response => response.json())
        .then(components => dispatch({
            type: 'FETCH_COMPONENTS',
            payload: components.data
            }, console.log(components)
           
        ))
    }
}