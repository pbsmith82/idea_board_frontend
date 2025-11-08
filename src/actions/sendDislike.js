export const sendDislike = (data) => {
 
    return (dispatch) => {
        return fetch(`http://localhost:3000/ideas/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({ idea: { dislikes: data.dislikes } })
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
                dispatch({type: 'ADD_DISLIKE', payload: idea.data});
                return idea.data;
            } else if (idea.error) {
                console.error('Error updating dislike:', idea.error);
                throw new Error(idea.error);
            } else {
                console.error('Unexpected response format:', idea);
                throw new Error('Unexpected response format');
            }
        })
        .catch(error => {
            console.error('Error sending dislike:', error);
            alert('Error updating dislike: ' + error.message);
            throw error;
        })
    }
}

