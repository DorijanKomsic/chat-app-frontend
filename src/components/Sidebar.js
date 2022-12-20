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
  
  socket.off('new-user').on('new-user', (payload) => {
      console.log(payload);
      setMembers(payload);
  })

  function getRooms() {
    fetch("http://localhost:5001/rooms")
        .then((res) => res.json())
        .then((data) => setRooms(data));
}
  console.log(getRooms());

  return (
    <>
      <h2>Rooms</h2>
      <ListGroup>
          {rooms.map((room, index) => (
            <ListGroup.Item key={index}>{room}</ListGroup.Item>
          ))}
      </ListGroup>
      <h2>Members</h2>
            <ListGroup>
                {members.map((member,index) => (
                  <ListGroup.Item  style={{cursor: 'pointer'}} key={index}>
                    {member.name}
                  </ListGroup.Item>
              ))}
            </ListGroup>
    </>
  )
}

export default Sidebar