import { useState, useRef } from "react";
import AntigravityBackground from "./AntigravityBackground";
import Robot from "./Robot";
import "./App.css";

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [robotActive, setRobotActive] = useState(false);

  const typingTimer = useRef<number | null>(null);

  /* ======================
     HANDLE TYPING
     - robot animation starts on typing
     - stops smoothly after pause
  ====================== */
  const handleType = (value: string) => {
    setQuestion(value);
    setRobotActive(true);

    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }

    typingTimer.current = window.setTimeout(() => {
      setRobotActive(false); // smooth stop
    }, 900);
  };

  /* ======================
     ASK BUTTON
     - flip card
     - show API / placeholder response
  ====================== */
  const handleAsk = () => {
    if (!question.trim()) return;

    setFlipped(true);
    setAnswer(""); // reset previous answer

    // Placeholder until API is connected
    setTimeout(() => {
      setAnswer(
        "⚠️ API not integrated yet.\n\nPlease connect the backend API to display real responses."
      );
    }, 500);
  };

  /* ======================
     ASK AGAIN
     - reset everything
  ====================== */
  const handleAskAgain = () => {
    setQuestion("");
    setAnswer("");
    setFlipped(false);
  };

  return (
    <div className="app">
      {/* Background */}
      <AntigravityBackground />

      {/* Robot (always visible, animation controlled by typing) */}
      <Robot active={robotActive} />

      {/* Main Card */}
      <div className="center-wrapper">
        <div className={`flip-card ${flipped ? "flipped" : ""}`}>
          <div className="flip-card-inner">

            {/* FRONT : QUESTION */}
            <div className="flip-card-front card">
              <h3>Ask your question</h3>

              <textarea
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => handleType(e.target.value)}
              />

              <button onClick={handleAsk} disabled={!question.trim()}>
                Ask
              </button>
            </div>

            {/* BACK : ANSWER */}
            <div className="flip-card-back card">
              <h3>AI Response</h3>

              <div className="answer-text">
                {answer || "Fetching response..."}
              </div>

              <div className="ask-again-box" onClick={handleAskAgain}>
                🔁 Ask another question
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
