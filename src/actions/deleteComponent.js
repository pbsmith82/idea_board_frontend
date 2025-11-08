import API_BASE_URL from '../config/api'

export const deleteComponent = (id) => {

    return (dispatch) => {
        return fetch(`${API_BASE_URL}/components/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'DELETE'
        })
        .then(resp => {
            if (!resp.ok) {
                return resp.json().then(err => {
                    throw new Error(err.error || 'Network response was not ok');
                });
            }
            return resp.json();
        })
        .then(data => {
            dispatch({type: 'DELETE_COMPONENT', payload: id});
            return data;
        })
        .catch(error => {
            console.error('Error deleting component:', error);
            alert('Error deleting component: ' + error.message);
            throw error;
        })
    }
}

