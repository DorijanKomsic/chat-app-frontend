import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Login.css'

function Signup() {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={5} className="login_bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-content-ceneter flex-direction-column">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
            </Form.Group>        
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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