import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import './NavBar.css'


export default function NavBar({ loggedIn, gitHubLogin, handleLogout, userData}) {

  return (
    <Navbar sticky="top" bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to='/'>CCC(logo?)</Navbar.Brand>
          <Nav className="me-auto">
<<<<<<< HEAD
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
            <Nav.Link as={Link} to='/cohort'>My Cohort</Nav.Link>
=======
            <Nav.Link as={Link} to='/'>Home</Nav.Link> 
            <Nav.Link as={Link} to='/cohort'>Cohort</Nav.Link>
>>>>>>> dev
            <Nav.Link as={Link} to='/profilepage'>My Page</Nav.Link>
              <NavDropdown title="Settings">
                {loggedIn ? (
                <>
                <NavDropdown.Item as={Link} to='/profilepage'>{userData.login}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/editprofilepage">Edit My Details</NavDropdown.Item>
                  {/* <NavDropdown.Item to="#action4">Report</NavDropdown.Item> */}
                  {/* <NavDropdown.Item to="#action4">Something Else</NavDropdown.Item> */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                </>
                ) : (
                  <NavDropdown.Item onClick={gitHubLogin}>Log In</NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to='/about'>About</NavDropdown.Item>
              </NavDropdown>
          </Nav>
        </Container>
    </Navbar>
  )
}
