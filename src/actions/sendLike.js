import API_BASE_URL from '../config/api'

export const sendLike = (data) => {
 
    return (dispatch) => {
        return fetch(`${API_BASE_URL}/ideas/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({ idea: { likes: data.likes } })
        })
        .then(resp => {
            if (!resp.ok) {
                return resp.json().then(err => {
                    throw new Error(err.error || 'Network response was not ok');
                });
            }
            return resp.json();
        })
        .then(idea => {
            if (idea.data && idea.data.attributes) {
                dispatch({type: 'ADD_LIKE', payload: idea.data});
                return idea.data;
            } else if (idea.error) {
                console.error('Error updating like:', idea.error);
                throw new Error(idea.error);
            } else {
                console.error('Unexpected response format:', idea);
                throw new Error('Unexpected response format');
            }
        })
        .catch(error => {
            console.error('Error sending like:', error);
            alert('Error updating like: ' + error.message);
            throw error;
        })
    }
}