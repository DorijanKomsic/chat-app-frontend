import React from 'react'
import {Navbar, Container, Button, Stack} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";

function Navigation() {

  const user = useSelector(state => state.user);
  console.log(user);

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
                  Signed in as: <a href="#">{user.name}</a>
               </Navbar.Text>
            )  
        }
        </Navbar.Collapse>
        {user && (
              <LinkContainer to="/login ">
                <Button href='/login' variant="outline-danger">Logout</Button>
              </LinkContainer>
        )}
        </Stack>
      </Container>
    </Navbar>
  )
}

export default Navigation