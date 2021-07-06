export const updateIdea = (data) => {
    return (dispatch) => {
      fetch(`http://localhost:8080/ideas/${data.id}`, {
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