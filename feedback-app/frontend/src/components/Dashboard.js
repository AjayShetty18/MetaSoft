import React, { useEffect, useState } from "react";

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch(() => console.error("Error fetching feedback"));
  }, []);

  return (
    <div className="dashboard">
      <h2>Feedback Dashboard</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <ul>
          {feedbacks.map((f, index) => (
            <li key={index}>
              <strong>{f.name}</strong> ({f.email}): {f.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
