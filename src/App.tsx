import { useState } from "react";
import AntigravityBackground from "./AntigravityBackground";
import "./App.css";

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flipped, setFlipped] = useState(false);

  const ask = () => {
    if (!question.trim()) return;

    setFlipped(true);

    setTimeout(() => {
      setAnswer(`Answer generated for:\n\n"${question}"`);
    }, 400);
  };

  const askAnother = () => {
    setQuestion("");
    setAnswer("");
    setFlipped(false);
  };

  return (
    <div className="app">
      <AntigravityBackground />

      <div className="center-wrapper">
        <div className={`flip-card ${flipped ? "flipped" : ""}`}>
          <div className="flip-card-inner">

            {/* FRONT */}
            <div className="flip-card-front card">
              <h3>User Question</h3>
              <textarea
                placeholder="Ask your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button onClick={ask} disabled={!question.trim()}>
                Ask
              </button>
            </div>

            {/* BACK */}
            <div className="flip-card-back card">
              <h3>AI Response</h3>

              <div className="answer-text">
                {answer || "Generating response..."}
              </div>

              <div className="ask-again-box" onClick={askAnother}>
                🔁 Ask another question
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
