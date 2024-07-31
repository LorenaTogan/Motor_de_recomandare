import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './chestionar.css';

function IntrebariChestionar() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
         
        const initialAnswers = {};
        result.forEach((question) => {
          initialAnswers[question.id_intrebari_chestionar] = null;
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [userId]);  

  const handleNoteChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
    setAnsweredQuestionsCount((prevCount) => {
       
      if (value !== null && value !== undefined && answers[questionId] === null) {
        return prevCount + 1;
      }
      return prevCount;
    });
  };
  

  const handleNextQuestion = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCurrentIndex((pageNumber - 1) * questionsPerPage);
  };

  const sendResponsesToServer = async () => {
    try {
      const responseData = Object.keys(answers).map((questionId) => ({
        id_User: userId,
        id_intrebari_chestionar: questionId,
        Raspunsuri_intrebare: answers[questionId],
         
      }));

      const response = await axios.post('http://localhost:8000/api/raspunsuri_chestionar/', responseData);

      console.log('Response from server:', response.data);
       
      window.location.href = `/paginacurenta?userId=${userId}`;
    } catch (error) {
      console.error('Error sending responses to server:', error);
    }
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = data.slice(indexOfFirstQuestion, indexOfLastQuestion);

  
  const allQuestionsAnswered = answeredQuestionsCount === data.length;

  return (
    <div className="container">
      <h1>Chestionar  </h1>
      {currentQuestions.length > 0 && currentQuestions.map((question, index) => (
        <div key={index} className="question-box">
          <p className="question-text">{question.text_intrebare}</p>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name={`question_${question.id_intrebari_chestionar}`}
                value="0"
                checked={answers[question.id_intrebari_chestionar] === 0}
                onChange={() => handleNoteChange(question.id_intrebari_chestionar, 0)}
              />
              0
            </label>
            <label>
              <input
                type="radio"
                name={`question_${question.id_intrebari_chestionar}`}
                value="1"
                checked={answers[question.id_intrebari_chestionar] === 1}
                onChange={() => handleNoteChange(question.id_intrebari_chestionar, 1)}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                name={`question_${question.id_intrebari_chestionar}`}
                value="2"
                checked={answers[question.id_intrebari_chestionar] === 2}
                onChange={() => handleNoteChange(question.id_intrebari_chestionar, 2)}
              />
              2
            </label>
          </div>
        </div>
      ))}
      <div className="pagination">
        {currentPage > 1 && (
          <button className="action-button shadow animate red" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}
        {currentPage < Math.ceil(data.length / questionsPerPage) && (
          <button className="action-button shadow animate green" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
         
        {allQuestionsAnswered && (
          <button className="action-button shadow animate green" onClick={sendResponsesToServer}>Submit</button>
        )}
      </div>
    </div>
  );
  
}

export default IntrebariChestionar;
