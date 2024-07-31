import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import "./login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Email:', email);
      console.log('Password:', password);
      const response = await axios.post('http://localhost:8000/api/login/', { email, password }); 
      if (response.data.id_utilizator) {
        console.log('Autentificare cu succes');
        const userId = response.data.id_utilizator;

        console.log(userId);
         
        const testStatusResponse = await axios.get(`http://127.0.0.1:8000/api/check-test-status/${userId}/`);
        

        console.log('Răspuns test status:', testStatusResponse.data);
       
        if (testStatusResponse.data.message === 'User has completed the test') {
           
          window.location.href = `/paginacurenta?userId=${userId}`;
        } else {
           
          window.location.href = `/intrebarichestionar?userId=${userId}`;
        }
      } else {
        console.log('Autentificare eșuată: ', response.data);
        alert('Autentificare eșuată. Verificați adresa de email și parola.');
      }
    } catch (error) {
      console.error('Eroare la autentificare:', error);
      alert('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    }
  };

  return (
    <MDBContainer fluid>
      <div className="p-5 bg-image" style={{backgroundImage: 'url(purple-backgrounds-9.jpg)', height: '300px'}}></div>
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>
        <h2 className="fw-bold mb-4">Autentificare</h2>

          <MDBInput 
            className='mb-4' 
            label='Email' 
            id='email' 
            type='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ marginBottom: '5px', marginLeft: '10px' }}  
          />
          <MDBInput 
            className='mb-4' 
            label='Password' 
            id='password' 
            type='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ marginBottom: '0px', marginLeft: '40px' }}  
          />
          <button
            className='w-100 mb-4' 
            size='lg' 
            style={{
              background: 'linear-gradient(to right, #007bff, #ff0000)', 
              border: 'none', 
              borderRadius: '5px', 
              color: '#fff', 
              padding: '20px 40px', 
              fontSize: '1.2em',
              cursor: 'pointer', 
              position: 'relative', 
              top: '10px',
              left: '-10px'
            }} 
            onClick={handleLogin}
          >
            Log in
          </button>

          <div className="text-center">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;

