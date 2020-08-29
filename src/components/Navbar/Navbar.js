import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import ThemeToggle from './ThemeToggle';

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar fixed='top' collapseOnSelect expand='md' bg='primary' variant='dark'>
          <Navbar.Brand>Andre Wohnsland</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer exact to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/projects'>
                <Nav.Link>Projects</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/blog'>
                <Nav.Link>Blog</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/about'>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            <ThemeToggle />
            <Nav>
              <NavDropdown title='Admin' id='collasible-nav-dropdown'>
                <LinkContainer to='/admin/projects'>
                  <NavDropdown.Item>Edit Projects</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/blog'>
                  <NavDropdown.Item>Edit Blog Article</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <Nav.Link href='https://github.com/AndreWohnsland'>My Github</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
