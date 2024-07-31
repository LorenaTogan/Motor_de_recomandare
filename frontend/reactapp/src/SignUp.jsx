import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', {
        nume: firstName,
        prenume: lastName,
        email: email,
        password: password,
      });

      if (response.status === 200) {  
        console.log('Sign up successful');
        window.location.href = `/login`;
      } else {
        console.log('Failed to sign up');
        throw new Error('Failed to sign up');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error || 'Sign up error';
        setError(errorMessage);
        console.log(errorMessage);
      } else {
        setError('Sign up error');
        console.log('Sign up error');
      }
      console.error('Sign up error:', error);
    }
  };

  return (
    <MDBContainer fluid>
      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>
          <h2 className="fw-bold mb-4">Sign up now</h2>
          <MDBRow className="mb-4">
            <MDBCol size="md-6">
              <MDBInput label='First name' id='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </MDBCol>
            <MDBCol size="md-6">
              <MDBInput label='Last name' id='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </MDBCol>
          </MDBRow>
          <MDBInput
            className='mb-4'
            label='Email'
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              position: 'relative',  
              left: '-17px',  
            }}
          />
          <MDBInput
            className='mb-4'
            label='Password'
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              position: 'relative',  
              left: '-3px',  
            }}
          />

          <div className='d-flex justify-content-center mb-4'>
            <input
              type='checkbox'
              id='rememberPassword'
              checked={rememberPassword}
              onChange={() => setRememberPassword(!rememberPassword)}
            />
            <label htmlFor='rememberPassword' className='ms-2'>Remember password</label>
          </div>

          
          {error && <div className="text-danger mb-4">{error}</div>}

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
              left: '-35px'
            }} 
            onClick={handleSignUp}
          >
            Sign up
          </button>

          <div className="text-center">
            <p>Already have an account? <Link to="/login">Log in</Link></p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;


