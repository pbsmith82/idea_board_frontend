export const sendComment = (data) => {

    return (dispatch) => {
        fetch(`http://localhost:3000/ideas/${data.idea_id}/comments/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(comment => dispatch({type: 'ADD_COMMENT', payload: comment.included[0]}))
    }
}