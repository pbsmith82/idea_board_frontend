import API_BASE_URL from '../config/api'

export const sendIdea = (data) => {

    return (dispatch) => {
        return fetch(`${API_BASE_URL}/ideas`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ idea: data })
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
                dispatch({type: 'ADD_IDEA', payload: idea.data});
                return idea.data; // Return so the promise resolves
            } else if (idea.error) {
                console.error('Error saving idea:', idea.error);
                throw new Error(idea.error);
            } else {
                console.error('Unexpected response format:', idea);
                throw new Error('Unexpected response format');
            }
        })
        .catch(error => {
            console.error('Error sending idea:', error);
            alert('Error saving idea: ' + error.message);
            throw error; // Re-throw so the promise rejects
        })
    }
}