// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    generatedCoverLetter: ''
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const generateCoverLetter = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/generate-cover-letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();
    setUserInfo({ ...userInfo, generatedCoverLetter: data.coverLetter });
  };

  return (
    <div className="cover-letter-form">
      <h1>AI Cover Letter Generator</h1>
      <form onSubmit={generateCoverLetter}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={userInfo.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={userInfo.jobTitle}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={userInfo.companyName}
          onChange={handleChange}
          required
        />
        <textarea
          name="jobDescription"
          placeholder="Job Description"
          value={userInfo.jobDescription}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Generate Cover Letter</button>
      </form>

      {userInfo.generatedCoverLetter && (
        <div className="generated-cover-letter">
          <h2>Your Generated Cover Letter</h2>
          <p>{userInfo.generatedCoverLetter}</p>
        </div>
      )}
    </div>
  );
}

export default App;
