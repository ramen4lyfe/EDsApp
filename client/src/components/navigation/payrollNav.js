import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaClock, FaCode, FaDollarSign } from 'react-icons/fa';

const PayrollNav = () => {
    return (
        <Navbar expand="md" className="flex-column" style={{ fontSize: '0.8rem' }}>
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
    );
};

export default PayrollNav;
