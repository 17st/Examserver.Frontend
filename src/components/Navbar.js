import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavigationBar = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const fromDuplicateTab = searchParams.get('fromDuplicateTab');

    const token = localStorage.getItem("token");


    return (
        <Navbar color="dark" dark expand="md">
            {fromDuplicateTab ? (
                <NavbarBrand className="text-center w-100" >You are now in quiz mode. Stay focused!</NavbarBrand>
            ) : (
                <>
            <NavbarBrand tag={Link} to="/">Exam Portal</NavbarBrand>
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/Home">Home</NavLink>
                            </NavItem>
                            {/* {token && (
                                <NavItem>
                                    <NavLink tag={Link} to="/create-test">Create Quiz</NavLink>
                                </NavItem>
                            )} */}
                            <NavItem>
                                <NavLink tag={Link} to="/practice-test">Practice Contest</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/live-contest">Live Contest</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="#!">About</NavLink>
                            </NavItem>
                            {token && (
                                <NavItem>
                                    <NavLink tag={Link} to="/profile">Profile</NavLink>
                                </NavItem>
                            )}
                            {!token && (
                                <NavItem>
                                    <NavLink tag={Link} to="/login">Login</NavLink>
                                </NavItem>
                            )}
                            {token && (
                                <NavItem>
                                    <NavLink tag={Link} to="/logout">Logout</NavLink>
                                </NavItem>
                            )}
                        </Nav>
        </>
            )}
        </Navbar>
    );
};

export default NavigationBar;
