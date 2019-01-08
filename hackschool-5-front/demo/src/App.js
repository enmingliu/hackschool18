import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Tweet extends React.Component { //tweet class 
  constructor() {   //tweet class constructor
    super();        //initializes parent react class
    this.state = {  //set var state to hold obj with key numLike, we use state to keep track of webpage data
      numLike: 0
    };
    this.buttonOnClick = () => { this.like(); }; //sets buttononclick function to call like function
  }

  like() { //like function to increment likes
    const lastLike = this.state.numLike;
    const newState = {
      numLike: lastLike + 1
    };
    this.setState(newState); //set state to new state of likes
  }

  render() {
    const numLike = this.state.numLike //access state var
    return (
      <div>
        <h2> {this.props.tweet} </h2> 
        <br/>
        <button onClick={this.buttonOnClick}>
          <span role="img" aria-label="Heart">❤️</span> 
          {numLike}
        </button> 
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      currentTweet: ''
    };
    this.tweetIndex = 0;
    this.inputOnChange = (event) => { this.updateCurrentTweet(event) };
    this.buttonOnClick = () => { this.addTweet(); };
  }

  updateCurrentTweet(event) {
    const newState = {
      currentTweet: event.target.value
    };
    this.setState(newState);
  }

  addTweet() {
    if (this.state.currentTweet === '') {
      alert('Input something first');
      return;
    }
    const currentTweetObj = {
      index: this.tweetIndex,
      content: this.state.currentTweet
    };
    this.tweetIndex++;

    const prevTweets = this.state.tweets;
    const newTweets = [currentTweetObj, ...prevTweets];
    const newState = {
      tweets: newTweets,
      currentTweet: ''
    };
    this.setState(newState);
  }

  render() {
    const tweets = this.state.tweets;
    const lists = tweets.map( (tweetObj)=><Tweet tweet={tweetObj.content} key={tweetObj.index}/> );
    return (
        <div>
          <input value={this.state.currentTweet} onChange={this.inputOnChange}/>
          <button onClick={this.buttonOnClick}>tweet</button>
          {lists}
        </div>
    );
  }
}

export default App;
