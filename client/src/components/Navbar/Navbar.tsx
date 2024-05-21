import React, { useContext } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { AuthContext } from '../../contexts/AuthContext'
import { ReactComponent as GithubLogo } from './github-original.svg'
import { logoutUser } from '../../util/apiHelper'
import PictureSelection from './PictureSelection'

const NavBar: React.FC = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const logout = async () => {
    const success = await logoutUser()
    if (success) {
      setIsAuth(false)
      return navigate('/')
    }
  }

  return (
    <>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        className="custom-navbar"
      >
        <Navbar.Brand>{process.env.REACT_APP_SHOWN_NAME}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/projects">
              <Nav.Link>Projects</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blog">
              <Nav.Link>Blog</Nav.Link>
            </LinkContainer>
            <PictureSelection />
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
                <LinkContainer to="/admin/image">
                  <NavDropdown.Item>Manage Images</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/changepassword">
                  <NavDropdown.Item>Change Password</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link href="https://github.com/AndreWohnsland">
              <div className="github">
                <GithubLogo width="20px" height="20px" />
                &nbsp;GitHub
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBar
