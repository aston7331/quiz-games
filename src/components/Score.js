import React, { useState, useEffect } from 'react';
import { getScore } from '../services/user.service'; // Import the function to fetch score from the backend API
import { useLocation } from 'react-router-dom';

function Score() {
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const name = searchParams.get('name');
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetchScore();
  }, []);

  const fetchScore = async () => {
    try {
      const response = await getScore(name); // Call the function to fetch score from the backend API
      setScore(response.data.score); // Assuming the score is returned as { score: <score_value> }
    } catch (error) {
      console.error('Error fetching score:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-xl w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Score</h1>
        {score !== null ? (
          <div className="text-center">
            <p className="text-4xl font-bold text-green-500">{score}</p>
            <p className="mt-2">Congratulations on completing the quiz!</p>
          </div>
        ) : (
          <p className="text-center">Fetching score...</p>
        )}
      </div>
    </div>
  );
}

export default Score;
