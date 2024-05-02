import React, { useState, useEffect } from 'react';
import { getQuestion, submitAnswer } from '../services/user.service';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function Quiz() {
  const { search } = useLocation();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [timer, setTimer] = useState(10);
  const searchParams = new URLSearchParams(search);
  const name = searchParams.get('name');
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer - 1);
      } else {
        clearInterval(countdown);
        setShowCorrectAnswer(true);
        if (selectedOption && !isCorrectAnswer(selectedOption.value)) {
          setSelectedOption(prevSelectedOption => ({ ...prevSelectedOption, isIncorrect: true }));
        }
        setTimeout(() => {
          setShowCorrectAnswer(false);
          goToNextQuestion();
        }, 3000); // Switch to the next question after 3 seconds
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const fetchQuizData = async () => {
    try {
      const response = await getQuestion();
      console.log(response);
      if (response?.data) {
        setQuizData(response.data);
      } else {
        throw new Error('Invalid quiz data format');
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchQuizData();
    }, 2000);
  }, []);

  const handleOptionSelect = async (option) => {
    setSelectedOption({ value: option, isIncorrect: false });
    clearInterval(timer);
    // Submit answer to the API
    try {
      const response = await submitAnswer({
        question_id: quizData[currentQuestionIndex].id,
        user_answer: option,
        name: name
      });
      console.log('Answer submitted:', response.data);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
      setTimer(10); // Reset timer for the next question
    } else {
      // Quiz completed
      // You can add logic to handle quiz completion here
      navigate(`/score?name=${name}`);
    }
  };

  const isCorrectAnswer = (option) => {
    return option === quizData[currentQuestionIndex]?.answer;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-xl w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome to the Quiz!</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{`Q.${currentQuestionIndex + 1}) ${quizData[currentQuestionIndex]?.question}`}</h2>
          <ul>
            {quizData[currentQuestionIndex]?.distractors.map((option, index) => (
              <li key={index} className="ml-4">
                <label className={`block relative rounded border border-gray-300 bg-white py-2 px-4 cursor-pointer ${selectedOption?.value === option ? (selectedOption.isIncorrect ? 'bg-red-200' : 'bg-blue-200') : ''} ${showCorrectAnswer && option === quizData[currentQuestionIndex]?.answer ? 'bg-green-200' : ''}`}>
                  <input type="radio" name={`question-${quizData[currentQuestionIndex]?.id}`} value={option} className="opacity-0 absolute h-0 w-0" onChange={() => handleOptionSelect(option)} disabled={selectedOption && selectedOption.value !== option} />
                  <span className="block">{option}</span>
                </label>
              </li>
            ))}
          </ul>
          {showCorrectAnswer && (
            <div className="text-center mt-2">
              <p className="text-green-500">Correct answer: {quizData[currentQuestionIndex]?.answer}</p>
            </div>
          )}
          {timer > 0 && !showCorrectAnswer && <p className="mt-2">Time remaining: {timer}</p>}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
