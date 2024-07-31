import React, { useState, useEffect } from 'react';
 
const history = createBrowserHistory();

function Utilizatori() {
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setData(result);
        
        const initialNotes = {};
        result.forEach((item, index) => {
          initialNotes[index] = 0;
        });
        setNotes(initialNotes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  function redirectToChestionar() {
    history.push('/chestionar');
  }

  return (
    <div>
      <h1>Utilizatori</h1>
      <p>Aici sunt afișați utilizatorii.</p>
      <button onClick={redirectToChestionar}>Mergi la Chestionar</button>
    </div>
  );
}

export default Utilizatori;
