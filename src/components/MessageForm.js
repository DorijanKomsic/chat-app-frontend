import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import './MessageForm.css'

function MessageForm() {
  
    const [message, setMessage] = useState("");
    const { socket, currentRoom, messages, setMessages, privateMessage } = useContext(AppContext)
    const user = useSelector(state => state.user);
    const messageEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages])

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
        const time = today.getHours() + ":" + minutes;

        const roomId = currentRoom;
        console.log(roomId);
        socket.emit('message-room', roomId, message, user, time, currentDate);
        setMessage("");
    }

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({behaviour: 'smooth'})
    }
    
    return (
        <>
            <div className='messages-form'>
                {user && !privateMessage?._id && (<div className='alert alert-info'>Currently in {currentRoom} room</div>)}
                {user && privateMessage?.id && (
                    <>
                        <div className='alert alert-info conversation-info'>
                            <div>
                                You began a conversation with {privateMessage.name}
                            </div>
                        </div>
                    </>
                )}
                {!user 
                    ? (<div className='alert alert-danger'>Please login!</div>) 
                
                    : messages.map(({_id: date, messagesByDate}, index) => (
                        <div key={index}>
                            <p className='alert alert-info text center message-date-indicator'>{date}</p>
                            {messagesByDate?.map(({content, time, from: sender}, msgIndex) => (
                                <div className={sender?.email == user?.email ? "message" : "incoming-message"} key={msgIndex}>
                                    <div className='message-inner'>
                                        <div className='d-flex align-items-center mb-3'>
                                            <u className='message-sender'>{sender._id === user?._id ? "You" : sender.name}:</u>
                                        </div>
                                        <p className='message-content'>{content}</p>
                                        <p className='message-timestamp'>{time}</p>
                                    </div>
                                </div>
                        ))}
                        </div>
                    ))}
                    <div ref={messageEndRef} />
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