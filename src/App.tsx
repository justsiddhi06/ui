import { useState } from "react";
import AntigravityBackground from "./AntigravityBackground";
import "./App.css";

const App: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
{/*api will be added here*/}
  const handleAsk = () => {
    if (!question.trim()) return;
    setAnswer(`This is a sample AI response for:\n\n"${question}"`);
  };

  return (
    <>
      {/* 🌌 Background */}
      <AntigravityBackground />

      {/* Chat UI */}
      <div className="page">
        <div className="card">
          <div className="chat-container">
            <div className="box">
              <h3>User Question</h3>
              <textarea
                placeholder="Ask your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button onClick={handleAsk}>Ask AI</button>
            </div>

            <div className="box">
              <h3>AI Answer</h3>
              <div className="answer">
                {answer || "AI response will appear here..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
