import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
<Container>
  <LinkContainer to="/">
    <Navbar.Brand>
    <img src={logo} alt='ProShop'/>
    ProShop
    </Navbar.Brand>
    </LinkContainer>

    {/* Generates hamburger menu when navbar is in collapsed state */}
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>

    {/* Wraps the collapsible part */}
    <Navbar.Collapse id="basic-navbar-nav">
        
        <Nav className="ms-auto">
            {/* Nav item with nav link and nav icon */}
            <LinkContainer to="/cart">
<Nav.Link><FaShoppingCart/> Cart</Nav.Link>
</LinkContainer>

<LinkContainer to="/login">
<Nav.Link><FaUser/> Sign In</Nav.Link>
</LinkContainer>
        </Nav>
    </Navbar.Collapse>
</Container>
        </Navbar>
    </header>
  )
}

export default Header