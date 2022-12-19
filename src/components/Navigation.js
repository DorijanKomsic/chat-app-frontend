import React from 'react'
import {Navbar, Container, Button, Stack} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutUserMutation } from '../services/appApi'

function Navigation() {

  const user = useSelector(state => state.user);
  const [logoutUser] = useLogoutUserMutation();
  
  async function handleLogout(e) {
      e.preventDefault();
      await logoutUser(user);
      
      window.location.replace('/login')
  }

  return (
    <Navbar bg='dark'  variant='dark' expand="lg">
      <Container fluid>
        <LinkContainer to="/">
         <Navbar.Brand>Chatter</Navbar.Brand>
        </LinkContainer>
        <Stack direction='horizontal' gap={4}>
        <Navbar.Collapse className="justify-content-end">
          {!user ? (
               <Navbar.Text>
                  Not signed in
               </Navbar.Text>
              )
            : (
               <Navbar.Text>
                  Signed in as: <u style={{color: "#F7F1EA"}}>{user.name}</u>
               </Navbar.Text>
            )  
        }
        </Navbar.Collapse>
        {user && (
              <LinkContainer to="/login ">
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </LinkContainer>
        )}
        </Stack>
      </Container>
    </Navbar>
  )
}

export default Navigation