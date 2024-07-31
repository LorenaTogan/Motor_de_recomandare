import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './PaginaCurenta.css';  

const categoryToFacultyMap = {
  "REALIST": "Facultatea de Inginerie",
  "CONVENTIONAL": "Facultatea de Economie",
  "SOCIAL": "Facultatea de Științe Sociale",
  "INVESTIGATIV": "Facultatea de Științe",
  "INTREPRINZATOR": "Facultatea de Afaceri",
  "ARTISTIC": "Facultatea de Arte"
};

function MyComponent() {
  const [personalities, setPersonalities] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  useEffect(() => {
    console.log('UserId received:', userId);
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  const fetchData = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/process-scores/?userId=${userId}`);
      const mappedData = response.data.map(person => {
        return {
          ...person,
          faculties: mapCategoriesToFaculties(person.personality)
        };
      });
      setPersonalities(mappedData);
    } catch (error) {
      console.error('Eroare:', error);
    }
  };

  const deleteResponses = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/raspunsuri_chestionar/?userId=${userId}`);
      console.log('Răspunsurile utilizatorului șterse cu succes din baza de date.');
    } catch (error) {
      console.error('Eroare la ștergerea răspunsurilor utilizatorului din baza de date:', error);
    }
  };

  const handleRefresh = () => {
    if (userId) {
      deleteResponses(userId);
    }
    window.location.href = `/intrebarichestionar?userId=${userId}`;
  };
  

  const mapCategoriesToFaculties = (personality) => {
    if (Array.isArray(personality)) {
      return personality.map(item => {
        const [cat1, cat2] = item.split(' - ');
        return `${categoryToFacultyMap[cat1] || cat1}, ${categoryToFacultyMap[cat2] || cat2}`;
      });
    }
    if (typeof personality === 'string') {
      const [cat1, cat2] = personality.split(' - ');
      return `${categoryToFacultyMap[cat1] || cat1}, ${categoryToFacultyMap[cat2] || cat2}`;
    }
    return personality;
  };

  return (
    <div className="container">
      <h1>Rezultate obținute la chestionar</h1>
       
      {personalities.map((person) => (
        <div key={person.id_User_id} className="result">
           
          <div className="categories">
          <img src="checklist-animated-gif-3.gif" alt="Descriptive Alt Text" className="responsive-image" />
            <strong>Categorie:</strong>
            {Object.entries(person.scores).map(([category, score]) => (
              <div key={category} className="category">
                <span className="category-name">{category}</span>: 
                <span className="category-score">{score}</span>
              </div>
            ))}
          </div>
          <div className="personalities">
            <strong>Personalitate:</strong>
            {Array.isArray(person.personality) ? (
              <div>
                {person.personality.map((pers, index) => (
                  <div key={index} className="personality">
                    <div>
                      <span className="category">{pers}</span>
                    </div>
                    <div>
                      <span className="faculty">{person.faculties[index]}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="personality">
                <div>
                  <span className="category">{person.personality}</span>
                </div>
                <div>
                  <span className="faculty">{person.faculties}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="actions">
        <button onClick={handleRefresh} className="refatestul">Refa testul</button>
        <Link to="http://localhost:5173" target="_blank" className="logout-link">
          Logout <FontAwesomeIcon icon={faSignOutAlt} />
        </Link>
      </div>
    </div>
  );
}

export default MyComponent;
