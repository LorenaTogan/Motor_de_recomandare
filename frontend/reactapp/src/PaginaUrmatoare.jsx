import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHelmetSafety, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 
import './paginaurmatoare.css';
 
 
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';  
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';  
  
 
 

     
 

function PaginaUrmatoare() {
  
  return (
    
    <div>
    <header className="navbar">
    <i className='logo'>QUESTIONNAIRE <FontAwesomeIcon icon={faHeart} /></i>

    <div className="social-icons">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="icon" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="icon" />
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="icon" />
        </a>  
    </div>
    
    <Link to="http://localhost:5173/login" >
              <FontAwesomeIcon icon={faUserCog} className="dropdown-icon" />
              Login
            </Link>
</header>

 
         
    <img src="./Capturel.PNG" alt="Descrierea imaginii" className="imagine-stil" />
    <h1 className='subtext'>Free career quiz uses the respected <span>Holland Code</span>  system to show you which jobs will suit your interests, talents, and aptitude.  </h1>
    <img className='testholland' src="./giphy.gif" alt="poza" />
    <b className='facultate'>Find out more about the field that matches your results and check out study offers to pursue a career in this field.</b>
    <Link to="https://www.unitbv.ro/facultati.html" target="_blank" className="btn btn-primary">
      Vezi facultățile
    </Link>

     
    <b className='incepeTestul'>Create an account to begin the test and explore more about the field matching your results, along with study offers to pursue a career in this field.</b>
<Link to="http://localhost:5173/signup" target="_blank" className="btn btn-primary2">
  Begin the test
</Link>

<div className='informatii'><b>Background</b > <br />
The Holland Occupational Themes is a theory of personality that focuses on career and vocational choice. It groups people on the basis of their suitability for six different categories of occupations. The six types yield the RIASEC acronym,
 by which the theory is also commonly known. The theory was developed by John L. Holland over the course of his career, starting in the 1950s. The typology has come to dominate the field of career counseling and has been incorporated into most of 
 the popular assessments used in the field. The RIASEC Markers from the Interest Item Pool were developed by Liao, Armstrong and Rounds (2008) for use in psychological research as a public domain alternative to the usual assessments which are marketed commercially. </div >

 <div className='informatii2'> <b>Steps to Take the Career Quiz</b> <br />
 To take the test, you first need to create an account or log in. If you are a new user, click on the "Sign Up" button to create a new account. You'll need to provide your email address, create a password, and fill in any other required information. 
 If you already have an account, click on the "Log In" button and enter your email address and password to access your account. Once logged in, navigate to the Career Quiz section.</div >

<div className='informatii3'> <b>Test Instructions</b> <br />
The test consists of 120 tasks that you will need to rate based on how much you would enjoy performing each task. Use the following scale to rate each task: (0) Dislike, (1) Neither like nor dislike, and (2) Like.
 Carefully read each task and select the rating that best represents your interest in performing it. After completing the test, submit your responses.</div >

 <div class="personality-details">
  <div class="personality-box">
    <div class="personality-title">Realistic</div>
    <div class="personality-description">Practical,hands-on activities.</div>
  </div>
  <div class="personality-box">
    <div class="personality-title">Investigative</div>
    <div class="personality-description">Analytical, enjoys problem-solving.</div>
  </div>
  <div class="personality-box">
    <div class="personality-title">Artistic</div>
    <div class="personality-description">Creative, enjoys artistic pursuits.</div>
  </div>
  <div class="personality-box">
    <div class="personality-title">Social</div>
    <div class="personality-description">Helping others, empathetic.</div>
  </div>
  <div class="personality-box">
    <div class="personality-title">Enterprising</div>
    <div class="personality-description">Persuasive, enjoys leading.</div>
  </div>
  <div class="personality-box">
    <div class="personality-title">Conventional</div>
    <div class="personality-description">Organized, detail-oriented.</div>
  </div>
</div> 

    <div className="review-section">
      <h2>What Our Users Say</h2>
      <div className="review">
        <div className="review-info">
          
          <div className="reviewer">Togan Paul</div>
          <div className="stars">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <div className="review-text">
          "I found the Career Quiz extremely helpful! It helped me identify my strengths and interests, leading me to discover career paths I hadn't considered before."
        </div>
      </div>
      <div className="review">
        <div className="review-info">
          <div className="reviewer">Togan Robert</div>
          <div className="stars">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <div className="review-text">
          "Thanks to the Career Quiz, I finally found clarity about my future career. It's a fantastic tool for anyone feeling lost or uncertain about their professional path."
        </div>
      </div>
      
    </div>

     

      <footer className="footer">
        <p>&copy; 2024 Questionnaire. Toate drepturile rezervate.</p>
      </footer>

   
       
    </div>
     


  );
}





export default PaginaUrmatoare;


