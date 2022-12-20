import React, { useContext, useEffect } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {AppContext} from '../context/appContext';

function Sidebar() {

  const user = useSelector(state => state.user);
  const { socket, members, setMembers, currentRoom, setCurrentRoom, rooms, setRooms, privateMessage, setPrivateMessage } = useContext(AppContext);
  
  useEffect(() => {
      if(user) {
        setCurrentRoom("gen-chat#1");
        getRooms();
        socket.emit("join-room", "gen-chat#1");
        socket.emit("new-user");
      }
  }, [])

  function joinRoom(room, isPublic=true) {
      if(!user) {
        return alert("Please log in to your account");
      }
      
      socket.emit('join-room', room);
      setCurrentRoom(room);

      if(isPublic) {
        setPrivateMessage(null);        
      }
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
            <ListGroup.Item key={index} onClick={() => joinRoom(room)} active={room === currentRoom} style={{cursor: 'pointer', display: 'flex', justifyContent: 'space-between'}}>
                  {room} {currentRoom !== room && <span></span>}
              </ListGroup.Item>
          ))}
      </ListGroup>
      <h2>Members</h2>
            <ListGroup>
                {members.map((member,index) => (
                  <ListGroup.Item  style={{cursor: 'pointer'}} active={privateMessage?._id == member?._id} key={index} onClick={() => handlePrivateMessage(member)} disabled={member?._id === user?._id}>
                    {member.name}
                  </ListGroup.Item>
              ))}
            </ListGroup>
    </>
  )
}

export default Sidebar