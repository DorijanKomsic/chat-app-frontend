import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import './MessageForm.css'

function MessageForm() {
  
    function handleSubmit(e){
        e.preventDefault();
    }
    
    return (
        <div>
            <div className='messages-form'></div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={11}>
                            <Form.Group>
                                <Form.Control type='text' placeholder='Aa'></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            <Button variant='danger' type='submit' style={{width: "100%"}}>
                                <i className='fas fa-paper-plane'></i>
                            </Button>
                        </Col>
                    </Row>

                </Form> 
        </div>
  )
}

export default MessageForm