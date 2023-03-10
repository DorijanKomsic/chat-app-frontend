import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom';
import './Signup.css'
import { useSignupUserMutation } from '../services/appApi';


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupUser, {isLoading, err}] = useSignupUserMutation()
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    signupUser({email, password}).then(({data}) => {
      if(data) {
        console.log(data);
        navigate('/')
      }
    })
  }


  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={5} className="signup_bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-content-ceneter flex-direction-column">
        <Form onSubmit={handleSignup}>
          <h3>Create an account</h3>
          <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
            </Form.Group>        
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
            </Form.Group>
            <Button variant="danger" type="submit">
              Submit
            </Button>
         </Form>
        </Col>
      </Row>
    </Container> 
  )
}

export default Signup