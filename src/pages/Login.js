import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import { useLoginUserMutation } from '../services/appApi';
import './Login.css';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, {isLoading, err}] = useLoginUserMutation();
  const navigate = useNavigate();
  const { socket } = useContext(AppContext); 

  function handleLogin(e) {
    e.preventDefault();

    loginUser({email, password}).then(({data}) => {
        if(data) {
          socket.emit('new-user');
          
          navigate('/');
        }
    });
  }


  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={5} className="login_bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-content-ceneter flex-direction-column">
         <Form onSubmit={handleLogin}>
          <h3>Login</h3>
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
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
            <div className='sign-up'>
                <p className='sign-up-text'>
                  Don't have an account ? <Link to="/signup">Signup here</Link>
                </p>
            </div>
          </Form>
        </Col>
      </Row>
   </Container>
  )
}
