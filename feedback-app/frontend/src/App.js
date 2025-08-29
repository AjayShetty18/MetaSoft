import React from "react";
import FeedbackForm from "./components/FeedbackForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Feedback Application</h1>
      <FeedbackForm />
      <Dashboard />
    </div>
  );
}

export default App;
