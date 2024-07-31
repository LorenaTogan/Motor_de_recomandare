 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaCurenta from './PaginaCurenta';
import PaginaUrmatoare from './PaginaUrmatoare';
import IntrebariChestionar from './IntrebariChestionar';
import SignUp from './SignUp';
import Login from './Login';
 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaUrmatoare />} />
        
        <Route path="/intrebarichestionar" element={<IntrebariChestionar />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/paginacurenta" element={<PaginaCurenta />} />
         
      </Routes>
    </Router>
  );
}

export default App;







