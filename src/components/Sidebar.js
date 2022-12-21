import React, { useContext, useEffect } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {AppContext} from '../context/appContext';
import { addNotifications, resetNotifications } from '../features/userSlice';
import './Sidebar.css'; 

function Sidebar() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  const { socket, members, setMembers, currentRoom, setCurrentRoom, rooms, setRooms, privateMessage, setPrivateMessage } = useContext(AppContext);
  
  useEffect(() => {
      if(user) {
        setCurrentRoom("gen-chat#1");
        getRooms();
        socket.emit("join-room", "gen-chat#1");
        socket.emit("new-user");
      }
  }, [])
  
  socket.off('notifications').on('notifications', (room) => {
      if(currentRoom !== room) dispatch(addNotifications(room));
    })

  function joinRoom(room, isPublic=true) {
      if(!user) {
        return alert("Please log in to your account");
      }
      
      socket.emit('join-room', room);
      setCurrentRoom(room);

      if(isPublic) {
        setPrivateMessage(null);        
      }

      dispatch(resetNotifications(room));

  }

  function orderbyId(id1, id2) {
      if(id1 > id2) {
        return id1 + '-' + id2;
      } else {
        return id2 + '-' + id1;
      }
  }

  function handlePrivateMessage(member){
      setPrivateMessage(member);
      const roomId = orderbyId(user._id, member._id);
      joinRoom(roomId, false);
  }
  
  socket.off('new-user').on('new-user', (payload) => {
      setMembers(payload);
  })

  function getRooms() {
    fetch("http://localhost:5001/rooms")
        .then((res) => res.json())
        .then((data) => setRooms(data));
}

  return (
    <>
      <h2>Rooms</h2>
      <ListGroup>
          {rooms.map((room, index) => (
            <ListGroup.Item className='selected-rooms' key={index} onClick={() => joinRoom(room)} active={room === currentRoom} style={{cursor: 'pointer', display: 'flex', justifyContent: 'space-between'}}>
                  {room} {currentRoom !== room && <span className='badge rouned-pill bg-danger'>{user.newMessages[room]}</span>}
              </ListGroup.Item>
          ))}
      </ListGroup>
      <h2>Members</h2>
            <ListGroup>
                {members.map((member,index) => (
                  <ListGroup.Item className='members-list' style={{cursor: 'pointer'}} active={privateMessage?._id === member?._id} key={index} onClick={() => handlePrivateMessage(member)} disabled={member?._id === user?._id}>
                      <Row>
                        <Col xs={2} className='member-status'>
                            {member.Status === 'online' ? <i className='fas fa-circle sidebar-online-status'></i> : <i className='fas fa-circle sidebar-offline-status '></i>}
                        </Col>
                        <Col xs={9}>
                          {member.name}
                          {member._id === user?._id && (" (You)")}
                        </Col>
                      </Row>
                  </ListGroup.Item>
              ))}
            </ListGroup>
    </>
  )
}

export default Sidebar