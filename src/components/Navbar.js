import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavigationBar = ({ disableLiveContest }) => {
    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Exam Portal</NavbarBrand>
            <Nav className="ms-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/add-course">Add Course</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/create-test">Create Quiz</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/live-contest">Live Contest</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="#!">About</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="#!">Contact</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default NavigationBar;
