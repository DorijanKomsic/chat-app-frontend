import React from 'react'
import {Navbar, Container, Button, Stack} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";

function Navigation() {
  return (
    <Navbar bg='dark'  variant='dark' expand="lg">
      <Container fluid>
        <LinkContainer to="/">
         <Navbar.Brand>Chatter</Navbar.Brand>
        </LinkContainer>
        <Stack direction='horizontal' gap={4}>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
        <LinkContainer to="/login ">
            <Button href='/login' variant="outline-danger">Logout</Button>
        </LinkContainer>
        </Stack>
      </Container>
    </Navbar>
  )
}

export default Navigation