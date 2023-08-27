import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      previousWord: 'start',
      currentWord: '',
      isPlaying: false,
      score: 0,
  timeLeft: 60,
  levels: [
    { name: 'Easy', timeLimit: 60 },
    { name: 'Medium', timeLimit: 45 },
    { name: 'Tough', timeLimit: 30 },
  ],
  selectedLevel: null,
    };
  }

  startGame = (selectedLevel) => {
    const timeLimit = selectedLevel.timeLimit;
    this.setState({
      previousWord: 'start',
      currentWord: '',
      isPlaying: true,
      score: 0,
    timeLeft: timeLimit,
    selectedLevel,
    });
    
  this.timerInterval = setInterval(this.updateTimer, 1000);
  };
  updateTimer = () => {
    const { timeLeft, isPlaying } = this.state;
  
    if (timeLeft === 0) {
      clearInterval(this.timerInterval);
      this.setState({ isPlaying: false });
      alert(`Time's up! Your score is ${this.state.score}`);
    } else if (isPlaying) {
      this.setState({ timeLeft: timeLeft - 1 });
    }
  };
  
  handleWordChange = (e) => {
    this.setState({ currentWord: e.target.value });
  };

  handleSubmitWord = (e) => {
    e.preventDefault();
    const { previousWord, currentWord,isPlaying, score } = this.state;
    if (!isPlaying) {
      return;
    }

    if (currentWord.trim() === '') {
      alert('Please enter a word.');
      return;
    }

    const lastCharPrevWord = previousWord.slice(-1);
    const firstCharCurrWord = currentWord.charAt(0);

    if (lastCharPrevWord.toLowerCase() === firstCharCurrWord.toLowerCase()) {
      this.setState({
        previousWord: currentWord,
        currentWord: '',
        score: score + 1,
      });
    } else {
      clearInterval(this.timerInterval);
    this.setState({ isPlaying: false });
    alert(`Incorrect word! Your score is ${score}`);
      alert('The word should start with the last character of the previous word.');
    }
  };

  render() {
    const { previousWord, currentWord, isPlaying,score, timeLeft ,levels, selectedLevel } = this.state;

    return (
      <div className="App">
        <h1>Word Association Game</h1>
        <p>Enter a word related to the previous word.</p>

        {isPlaying ? (
          <div>
            <p>Previous Word: {previousWord}</p>
            <form onSubmit={this.handleSubmitWord}>
              <input
                type="text"
                placeholder="Enter a word"
                value={currentWord}
                onChange={this.handleWordChange}
              />
              <button type="submit">Submit</button>
            </form>
            <p>Score: {score}</p>
          <p>Time Left: {timeLeft} seconds</p>
          </div>
        ) : (
          <div>
            {selectedLevel ? (
              <div>
          <p>Game Over! Your final score is {score}.</p>
           <button onClick={() => this.startGame(selectedLevel)}>Play Again</button>
          </div>
          ) : (
            <div>
              <p>Select a level:</p>
              <div className="level-buttons">
                {levels.map((level, index) => (
                  <button
                    key={index}
                    onClick={() => this.startGame(level)}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
            
        )}
      </div>
      )}
      </div>
    );
}
}
export default App;
