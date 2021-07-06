export const deleteIdea = (ideaId) => {
    return (dispatch) => {
        return fetch(`http://localhost:8080/ideas/${ideaId}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(idea => dispatch({type: 'DELETE_IDEA', payload: idea}))
    }
}