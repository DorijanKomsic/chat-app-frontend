import React, { useContext } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import {AppContext} from '../context/appContext';

function Sidebar() {

  const roomList = ["gen-chat-1", "gen-chat-2", "gen-chat-3"];
  const { socket, members, setMembers, currentRoom, setCurrentRoom, rooms, setRooms, privateMessage, setPrivateMessage } = useContext(AppContext);

  socket.off('new-user').on('new-user', (payload) => {
      console.log(payload);
      setMembers(payload);
  })

  console.log(members);

  return (
    <>
      <h2>Rooms</h2>
      <ListGroup>
          {roomList.map((room, index) => (
            <ListGroup.Item key={index}>{room}</ListGroup.Item>
          ))}
      </ListGroup>
      <h2>Members</h2>
            {members.map(member => (
              <ListGroup.Item key={member.id} style={{cursor: 'pointer'}}>
                {member.name}
                hello
              </ListGroup.Item>
            ))}
    </>
  )
}

export default Sidebar