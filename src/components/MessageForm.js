import React, { useContext, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import './MessageForm.css'

function MessageForm() {
  
    const [message, setMessage] = useState("");
    const { socket, currentRoom, messages, setMessages, privateMessage } = useContext(AppContext)
    const user = useSelector(state => state.user);

    const currentDate = getFormattedDate();

    socket.off('room-messages').on('room-messages', (messages) => {
        setMessages(messages);
    })

    function getFormattedDate() {
         const date = new Date();
         const year = date.getFullYear(); 
         let month = (1 + date.getMonth()).toString();

         month = month.length > 1 ? month : '0' + month;
         
         let day = date.getDate().toString(); 
         day = day.length > 1 ? day : '0' + day;

         return month + "/" + day + "/" + year;
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!message) return;
        
        const today = new Date();
        const minutes = today.getMinutes() < 10 ?  '0' + today.getMinutes() : today.getMinutes();
        const time = today.getHours + ":" + minutes;

        const roomId = currentRoom;
        console.log(roomId);
        socket.emit('message-room', roomId, message, user, time, currentDate);
        setMessage("");
    }

    
    return (
        <>
            <div className='messages-form'>
                {!user 
                    ? (<div className='alert alert-danger'>Please login!</div>) 
                
                    : messages.map(({_id: date, messagesByDate}, index) => (
                        <div key={index}>
                            <p className='alert alert-info text center message-date-indicator'>{date}</p>
                            {messagesByDate?.map(({content, time, from: sender}, msgIndex) => (
                                <div className='message' key={msgIndex}>
                                    <p>{content}</p>
                                </div>
                        ))}
                        </div>
                    ))}
                </div>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={11}>
                                <Form.Group>
                                    <Form.Control type='text' placeholder='Aa' disabled={!user} onChange={(e) => setMessage(e.target.value)} value={message}></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={1}>
                                <Button variant='danger' type='submit' style={{width: "100%"}} disabled={!user}>
                                    <i className='fas fa-paper-plane'></i>
                                </Button>
                            </Col>
                        </Row>

                    </Form> 
        </>
  )
}

export default MessageForm