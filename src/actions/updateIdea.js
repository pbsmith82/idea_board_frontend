import API_BASE_URL from '../config/api'

export const updateIdea = (data) => {
    return (dispatch) => {
      fetch(`${API_BASE_URL}/ideas/${data.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(data)
      })
      .then(resp => resp.json())
      .then(idea => dispatch({type: 'UPDATE_IDEA', payload: idea.data}))
    }
  
  }