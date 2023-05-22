import { useState, useRef } from "react";
import "../style.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState("25:00");
  const [isStartClock, setIsStartClock] = useState(true);
  const [timerLabel, setTimerLaber] = useState("Session");
  const [isBreak, setIsBreak] = useState(false);

  function handleReset() {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft("25:00");
    sessionLengthSec.current = sessionLength * 60;
    setTimerLaber("Session");
    setIsBreak(false);
    clearInterval(interval.current);
    setIsStartClock(true);
  }

  function handleClockLentgth(e) {
    const id = e.target.id;
    let sesLong = sessionLength;
    const sesLongDecrem = sesLong <= 1 ? sesLong : sesLong - 1;
    const sesLongIncrem = sesLong >= 60 ? sesLong : sesLong + 1;

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
        setSessionLength(sesLongDecrem);
        setTimeLeft(
          sesLongDecrem < 10 ? `0${sesLongDecrem}:00` : `${sesLongDecrem}:00`
        );
        break;
      case "session-increment":
        setSessionLength(sesLongIncrem);
        setTimeLeft(
          sesLongIncrem < 10 ? `0${sesLongIncrem}` : `${sesLongIncrem}:00`
        );
        break;
    }
  }

  const interval = useRef(null);
  const sessionLengthSec = useRef(sessionLength * 60);
  function startClock() {
    sessionLengthSec.current -= 1;
    let isBreakTrue = isBreak;
    interval.current = setInterval(() => {
      let min = Math.floor(sessionLengthSec.current / 60);
      let sec = sessionLengthSec.current % 60;
      if (min < 10) min = `0${min}`;
      if (sec < 10) sec = `0${sec}`;
      setTimeLeft(min + ":" + sec);
      sessionLengthSec.current -= 1;
      if (sessionLengthSec.current < 0 && !isBreakTrue) {
        setTimerLaber("Break");
        setIsBreak(true);
        sessionLengthSec.current = breakLength * 60;
        isBreakTrue = true;
      }
      if (sessionLengthSec.current < 0 && isBreakTrue) {
        setTimerLaber("Session");
        setIsBreak(false);
        sessionLengthSec.current = sessionLength * 60;
        isBreakTrue = false;
      }
    }, 1000);
    setIsStartClock(false);
  }

  function stopClock() {
    sessionLengthSec.current -= 1;
    clearInterval(interval.current);
    setIsStartClock(true);
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
            <button onClick={handleClockLentgth} id="session-increment">
              Arriba
            </button>
          </div>
        </div>
      </div>
      <div className="display">
        <h2 id="timer-label">{timerLabel}</h2>
        <p id="time-left">{timeLeft}</p>
        <div className="display-control">
          {isStartClock ? (
            <button onClick={startClock} id="start_stop">
              {" "}
              Start
            </button>
          ) : (
            <button onClick={stopClock} id="start_stop">
              {" "}
              Stop
            </button>
          )}

          <button onClick={handleReset} id="reset">
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
