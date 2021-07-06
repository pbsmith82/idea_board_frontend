export const sendIdea = (data) => {

    return (dispatch) => {
        fetch('http://localhost:8080/ideas', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(idea => dispatch({type: 'ADD_IDEA', payload: idea.data}))
    }
}