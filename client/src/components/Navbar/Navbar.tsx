import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import ThemeToggle from './ThemeToggle';
import { AuthContext } from '../../contexts/AuthContext';
import GithubLogo from './github-original.svg';

const NavBar: React.FC = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
      >
        <Navbar.Brand>Andre Wohnsland</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer exact to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/projects">
              <Nav.Link>Projects</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blog">
              <Nav.Link>Blog</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Pictures" id="collasible-nav-dropdown">
              <LinkContainer to="/pictures/fotography">
                <NavDropdown.Item>Fotography</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/pictures/woodwork">
                <NavDropdown.Item>Woodwork</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <ThemeToggle />
          <Nav>
            {isAuth && (
              <NavDropdown title="Admin" id="collasible-nav-dropdown">
                <LinkContainer to="/admin/projects">
                  <NavDropdown.Item>Edit Projects</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/blog">
                  <NavDropdown.Item>Edit Blog Article</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer exact to="/admin/image">
                  <NavDropdown.Item>Add Images</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer exact to="/admin/image/delete">
                  <NavDropdown.Item>Delete Images</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/changepassword">
                  <NavDropdown.Item>Change Password</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            <Nav.Link href="https://github.com/AndreWohnsland">
              <div className="github">
                <img
                  src={GithubLogo}
                  alt="GitHub Logo"
                  width="20px"
                  height="20px"
                />
                &nbsp;GitHub
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(NavBar);
