import { useState } from "react";

function App() {
  const [randomNum, setRandomNum] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState("");
  const [attempts, setAttempts] = useState(5); // Limit number of attempts
  const [guessHistory, setGuessHistory] = useState([]);

  const appStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#F08080",
  };

  const buttonStyle = {
    color: "red",
    fontSize: "20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "10px 20px",
    margin: "5px",
  };

  const handleClick = () => {
    let num = Math.floor(Math.random() * 3) + 1;
    setRandomNum(num);
    setMessages("You have " + attempts + " attempts. Start guessing!");
    setGuessHistory([]);
    setUserInput("");
  };

  const handleGuess = () => {
    const guess = parseInt(userInput); // Convert input to integer
    if (isNaN(guess) || guess < 1 || guess > 10) {
      setMessages("Please enter a valid number between 1 and 10.");
      return;
    }

    setGuessHistory([...guessHistory, guess]);
    
    if (guess === randomNum) {
      setMessages("Congrats! You guessed the number right: " + randomNum);
      return; // Stop if guessed correctly
    }

    setAttempts(attempts - 1);
    if (attempts > 1) {
      const hint = guess < randomNum ? "Too low!" : "Too high!";
      setMessages(`${hint} You have ${attempts - 1} attempts left.`);
    } else {
      setMessages("Game over! The correct number was " + randomNum + ".");
    }

    setUserInput(""); // Clear the input field
  };

  return (
    <div style={appStyle}>
      <h1>Guess the Number</h1>
      <button style={buttonStyle} onClick={handleClick}>
        Start
      </button>
      {messages && <p>{messages}</p>}
      {randomNum !== null && (
        <>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your guess"
          />
          <button style={buttonStyle} onClick={handleGuess}>
            Submit Guess
          </button>
          <h3>Guess History: {guessHistory.join(", ")}</h3>
        </>
      )}
    </div>
  );
}

export default App;