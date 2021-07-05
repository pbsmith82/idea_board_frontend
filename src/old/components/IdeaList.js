import React from 'react';



class IdeaList extends React.Component {
  listIdeas = () => {
    return this.props.ideaTitles
  }

  render() {
    return (
      <div class="panel panel-default">
        {this.listIdeas()}
      </div>
    )
  }
}

export default IdeaList;
