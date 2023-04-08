import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
return (
<Container fluid>
    <Navbar sticky="top" expand="lg" variant="light" bg="light" className="p-2">
    <Navbar.Brand href="#">EDs App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Item>
            <NavLink
            to="/shifts"
            className="nav-link"
            activeclassname="active"
            >
            Shift Schedule
            </NavLink>
        </Nav.Item>
        <Nav.Item>
            <NavLink
            to="/bookings"
            className="nav-link"
            activeclassname="active"
            >
            Bookings
            </NavLink>
        </Nav.Item>
        <Nav.Item>
            <NavLink
            to="/employees"
            className="nav-link"
            activeclassname="active"
            >
            Employees
            </NavLink>
        </Nav.Item>
        <Nav.Item>
            <NavLink
            to="/timesheets"
            className="nav-link"
            activeclassname="active"
            >
            Payroll
            </NavLink>
        </Nav.Item>
        
        </Nav>
    </Navbar.Collapse>
    </Navbar>
</Container>
);
};

export default NavigationBar;
