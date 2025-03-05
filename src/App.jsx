import { useState, useEffect, useRef } from "react";
import "./App.css";
import clickSound from "./sounds/click.mp3";
import tooSoonSound from "./sounds/too-soon.mp3";
import successSound from "./sounds/success.mp3";
import bestTimeSound from "./sounds/best-time.mp3";

export default function App() {
  const [gameState, setGameState] = useState("start");
  const [reactionTime, setReactionTime] = useState(null);
  const [tooSoon, setTooSoon] = useState(false);
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") || null
  );
  const [leaderboard, setLeaderboard] = useState(
    JSON.parse(localStorage.getItem("leaderboard")) || []
  );
  const [startTime, setStartTime] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [newBest, setNewBest] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // Store timeout ID to clear if needed
  const timeoutRef = useRef(null);

  // Check for screen size and update on resize
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const playSound = (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const startGame = () => {
    setGameState("waiting");
    setTooSoon(false);
    setNewBest(false);
    setWaiting(true);

    // Close menu if open on mobile
    if (isMobile) {
      setMenuVisible(false);
    }

    // Clear any previous timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const delay = Math.floor(Math.random() * 3000) + 2000;
    timeoutRef.current = setTimeout(() => {
      setGameState("react");
      setStartTime(Date.now());
      setWaiting(false);
    }, delay);
  };

  const handleClick = () => {
    playSound(clickSound);

    if (gameState === "waiting" && waiting) {
      setTooSoon(true);
      console.log("Too soon!");
      playSound(tooSoonSound);
      setGameState("tooSoon");

      // Clear the timeout to prevent "react" from triggering
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setTimeout(() => {
        setTooSoon(false);
        setGameState("start");
      }, 2000);
    } else if (gameState === "react") {
      const timeTaken = Date.now() - startTime;
      setReactionTime(timeTaken);
      setGameState("result");
      playSound(successSound);

      if (!bestTime || timeTaken < bestTime) {
        setBestTime(timeTaken);
        setNewBest(true);
        playSound(bestTimeSound);
        localStorage.setItem("bestTime", timeTaken);
      }

      const updatedLeaderboard = [...leaderboard, timeTaken]
        .sort((a, b) => a - b)
        .slice(0, 5);
      setLeaderboard(updatedLeaderboard);
      localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      {isMobile && (
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuVisible ? "✕" : "☰"}
        </button>
      )}

      <div className={`leaderboard ${isMobile && menuVisible ? "visible" : ""}`}>

        <h3>🏆 Leaderboard 🏆</h3>
        <ul>
          {leaderboard.length === 0 ? (
            <p>No records yet</p>
          ) : (
            leaderboard.map((time, index) => (
              <li key={index}>{index + 1}. {time}ms</li>
            ))
          )}
        </ul>
        <button className="reset-btn" onClick={() => {
          setLeaderboard([]);
          setBestTime(null);
          localStorage.removeItem("leaderboard");
          localStorage.removeItem("bestTime");
        }}>Reset Leaderboard</button>
      </div>

      <div className="game-area">
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        {gameState === "start" && (
          <button onClick={startGame} className="start-btn">
            Start Game
          </button>
        )}

        {gameState === "waiting" && <div onClick={handleClick} className="message">Get Ready...</div>}

        {gameState === "react" && (
          <div onClick={handleClick} className="reaction-screen">
            CLICK NOW!
          </div>
        )}

        {gameState === "tooSoon" && <div className="too-soon">Too Soon! Try Again.</div>}

        {gameState === "result" && (
          <div className="result">
            <h2>
              Your reaction time:{" "}
              <span className={reactionTime >= 1000 ? "slow-reaction" : "fast-reaction"}>
                {reactionTime}ms
              </span>
            </h2>
            {bestTime && <p>Best Time: <strong>{bestTime}ms</strong></p>}

            {newBest && (
              <div className="best-time-message">
                🎉 New Best Time! 🏅 <br />
                <p>You're as fast as a cheetah! 🐆</p>
              </div>
            )}

            <button onClick={() => setGameState("start")} className="restart-btn">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}