import React from 'react';
import './App.css'; // You can delete this file
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Score from './components/Score';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/quiz" element={<Quiz />} /> {/* Define route for Quiz component */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/score" element={<Score />} />
      </Routes>
    </Router>
  );
}

export default App;
