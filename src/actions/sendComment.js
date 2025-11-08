import API_BASE_URL from '../config/api'

export const sendComment = (data) => {

    return (dispatch) => {
        fetch(`${API_BASE_URL}/ideas/${data.idea_id}/comments/`, {
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