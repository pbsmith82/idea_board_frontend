export const sendComponent = (data) => {

    return (dispatch) => {
        return fetch('http://localhost:3000/components', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ component: data })
        })
        .then(resp => {
            if (!resp.ok) {
                return resp.json().then(err => {
                    throw new Error(err.error || 'Network response was not ok');
                });
            }
            return resp.json();
        })
        .then(component => {
            if (component.data && component.data.attributes) {
                dispatch({type: 'ADD_COMPONENT', payload: component.data});
                return component.data; // Return so the promise resolves
            } else if (component.error) {
                console.error('Error saving component:', component.error);
                throw new Error(component.error);
            } else {
                console.error('Unexpected response format:', component);
                throw new Error('Unexpected response format');
            }
        })
        .catch(error => {
            console.error('Error sending component:', error);
            alert('Error saving component: ' + error.message);
            throw error; // Re-throw so the promise rejects
        })
    }
}

