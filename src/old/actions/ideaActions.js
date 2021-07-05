export const fetchIdeas = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_IDEAS'})
      fetch('http://localhost:8080/ideas').then(response => {
        return response.json()
      }).then(responseJSON => {
        
        dispatch({ type: 'ADD_IDEAS', ideas: responseJSON.data.map (idea => 
          idea.attributes.title
        )
        })
      })
    }
  }
  