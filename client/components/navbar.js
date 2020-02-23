import React, { Component, useState } from "react";
import Link from "next/link";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdbreact";
import '../stylesheets/navbar.css'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState("false");

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <MDBNavbar className="bg-blue" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">PeerLance</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem className="mx-1 px-1">
            <Link href="#">
              <a className="text-white">Допомога поблизості</a>
            </Link>
          </MDBNavItem>
          <MDBNavItem  className="mx-1 px-1">
            <Link href="#">
              <a className="text-white"> Місцеві поради</a>
            </Link>
          </MDBNavItem>
          <MDBNavItem className="mx-1 px-1">
            <Link href="#">
              <a className="text-white">Рейтинг добродіячів</a>
            </Link>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default to-right">
                <MDBDropdownItem href="#!">Мій кабінет</MDBDropdownItem>
                <MDBDropdownItem href="#!">Запит про допомогу</MDBDropdownItem>
                <MDBDropdownItem href="#!">
                  Стати автором поради
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default NavBar;
