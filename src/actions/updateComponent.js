export const updateComponent = (data) => {

    return (dispatch) => {
        return fetch(`http://localhost:3000/components/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({ component: { name: data.name } })
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
                dispatch({type: 'UPDATE_COMPONENT', payload: component.data});
                return component.data;
            } else if (component.error) {
                console.error('Error updating component:', component.error);
                throw new Error(component.error);
            } else {
                console.error('Unexpected response format:', component);
                throw new Error('Unexpected response format');
            }
        })
        .catch(error => {
            console.error('Error updating component:', error);
            alert('Error updating component: ' + error.message);
            throw error;
        })
    }
}

