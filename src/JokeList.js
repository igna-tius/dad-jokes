import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import uuid from "uuid/v4";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
  }
  async componentDidMount() {
    //Load Jokes
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });
      jokes.push({ id: uuid(), joke: res.data.joke, votes: 0 });
    }
    this.setState({ jokes: jokes });
  }

  handleVote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  }

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
          <button className="JokeList-getmore">New Jokes</button>
        </div>

        <div className="JokeList-jokes">
          {this.state.jokes.map(m => (
            <Joke
              key={m.id}
              votes={m.votes}
              joke={m.joke}
              upvote={() => this.handleVote(m.id, 1)}
              downvote={() => this.handleVote(m.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default JokeList;