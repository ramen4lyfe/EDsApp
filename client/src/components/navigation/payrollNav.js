// a vertical nav bar with react-icons link to the payroll pages
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; 
import { FaClock, FaCode, FaDollarSign } from 'react-icons/fa';

const PayrollNav = () => {
    return (
        <Container fluid className='mb-3' style={{ fontSize: '0.8rem'}} >
            <Navbar expand="lg" variant="light" className="" >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto flex-column">
                        <Nav.Item>
                            <NavLink
                                to="/timesheets"
                                className="nav-link"
                                activeclassname="active"
                            >
                                <FaClock /> Timesheet
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="/alpha-codes"
                                className="nav-link"
                                activeclassname="active"
                            >
                                <FaCode /> Alpha Codes
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="/pay-rate"
                                className="nav-link"
                                activeclassname="active"
                            >
                                <FaDollarSign /> Pay Rate
                            </NavLink>
                        </Nav.Item>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default PayrollNav;


