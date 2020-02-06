import React, { Component } from "react";

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i class="fas fa-arrow-up" onClick={this.props.upvote} />
          <span>{this.props.votes}</span>
          <i class="fas fa-arrow-down" onClick={this.props.downvote} />
        </div>
        <div className="Joke-text">{this.props.joke}</div>
      </div>
    );
  }
}
export default Joke;
