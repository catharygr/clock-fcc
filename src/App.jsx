import { useState } from "react";
import "../style.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, seiTmeLeft] = useState("25:00");

  function handleReset() {
    setBreakLength(5);
    setSessionLength(25);
    seiTmeLeft("25:00");
  }

  function handleClockLentgth(e) {
    const id = e.target.id;
    switch (id) {
      case "break-decrement":
        setBreakLength((oldValue) =>
          oldValue <= 1 ? oldValue : (oldValue -= 1)
        );
        break;
      case "break-increment":
        setBreakLength((oldValue) =>
          oldValue >= 60 ? oldValue : (oldValue += 1)
        );
        break;
      case "session-decrement":
        setSessionLength((oldValue) =>
          oldValue <= 1 ? oldValue : (oldValue -= 1)
        );
        break;
      case "session-increment":
        setSessionLength((oldValue) =>
          oldValue >= 60 ? oldValue : (oldValue += 1)
        );
        break;
    }
  }
  return (
    <main className="container">
      <h1>25 + 5 Clock</h1>
      <div className="control">
        <div>
          <p id="break-label">Break Length</p>
          <div className="mini-control">
            <button onClick={handleClockLentgth} id="break-decrement">
              Abajo
            </button>
            <p id="break-length">{breakLength}</p>
            <button onClick={handleClockLentgth} id="break-increment">
              Arriba
            </button>
          </div>
        </div>

        <div>
          <p id="session-label">Session Length</p>
          <div className="mini-control">
            <button onClick={handleClockLentgth} id="session-decrement">
              Abajo
            </button>
            <p id="session-length">{sessionLength}</p>
            <button onClick={handleCockLentgth} id="session-increment">
              Arriba
            </button>
          </div>
        </div>
      </div>
      <div className="display">
        <h2 id="timer-label">Session</h2>
        <p id="time-left">{timeLeft}</p>
        <div className="display-control">
          <button id="start_stop">Start</button>
          <button onClick={handleReset} id="reset">
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
