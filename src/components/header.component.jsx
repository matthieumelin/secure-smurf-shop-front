import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import Colors from "../utils/colors.util";
import Button from "./utils/button.component";

export default function Header() {
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);

  return (
    <StyledHeader>
      <Navbar navbarIsOpen={navbarIsOpen}>
        <NavbarWrapper>
          <NavbarBrand>Secure Smurf Shop</NavbarBrand>
          <NavbarRight>
            <NavbarRightCustomer>
              <NavbarRightCustomerIcon icon={faUser} />
            </NavbarRightCustomer>
            <NavbarRightToggle onClick={() => setNavbarIsOpen(!navbarIsOpen)} />
          </NavbarRight>
        </NavbarWrapper>
        <NavbarContent navbarIsOpen={navbarIsOpen}>
          <NavbarMenus>
            <NavbarMenu>
              <NavbarMenuTitle>Services</NavbarMenuTitle>
              <NavbarMenuItem>
                <NavbarMenuItemLink to="/">
                  <NavbarMenuItemLinkIcon
                    src={`${process.env.PUBLIC_URL}/images/lol-icon.png`}
                    alt="LoL Smurfs"
                  />{" "}
                  LoL Smurfs
                </NavbarMenuItemLink>
              </NavbarMenuItem>
            </NavbarMenu>
            <NavbarMenu>
              <NavbarMenuTitle>Other</NavbarMenuTitle>
              <NavbarMenuItem>
                <NavbarMenuItemLink to="/">Support</NavbarMenuItemLink>
              </NavbarMenuItem>
            </NavbarMenu>
          </NavbarMenus>
          <Button title={"Client Area"} bgColor={Colors.primary} />
        </NavbarContent>
      </Navbar>
      <HeaderContent>
        <HeaderTitle>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </HeaderTitle>
        <HeaderDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae,
          voluptatem.
        </HeaderDescription>
        <HeaderButtons>
          <Button
            title={"Buy account"}
            type={"submit"}
            bgColor={Colors.primary}
          />
        </HeaderButtons>
      </HeaderContent>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-image: linear-gradient(
      to bottom,
      rgba(123, 44, 191, 0.3),
      rgba(123, 44, 191, 0.3)
    ),
    url("${process.env.PUBLIC}/images/header.jpg");
  background-position: center;
  background-size: cover;
`;
const Navbar = styled.nav`
  ${(props) => {
    if (props.navbarIsOpen) {
      return `
    &::before {
      content: "";
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,0.5);
    }
    `;
    }
  }}
`;
const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
`;
const NavbarContent = styled.div`
  z-index: 999;
  background-color: ${Colors.lightGray};
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  -webkit-transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
  -moz-transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
  -ms-transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
  -o-transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
  transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
  overflow: hidden;
  max-width: 0px;
  padding: 0;
  opacity: 0;
  ${(props) => {
    if (props.navbarIsOpen) {
      return `
      opacity: 1;
      overflow: hidden;
      white-space: nowrap;
      max-width: 320px;
      transition: max-width 0.5s, padding 0.3s, opacity 0.2s ease;
      padding: 0 40px;
      box-shadow: 0px 0px 30px rgb(0 0 0 / 50%);
      `;
    }
  }}
`;
const NavbarMenus = styled.div``;
const NavbarMenu = styled.ul`
  list-style: none;
  padding: 0;
`;
const NavbarMenuTitle = styled.h1`
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;

  @media screen and (min-width: 1024px) {
    font-size: 2rem;
  }
`;
const NavbarMenuItem = styled.li``;
const NavbarMenuItemLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    color: ${Colors.primary};
  }
`;
const NavbarMenuItemLinkIcon = styled.img`
  display: block;
  width: 24px;
  height: 24px;
  margin: 0 10px 0 0;
`;
const NavbarBrand = styled.h4`
  margin: 0;
  color: white;
`;
const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;
const NavbarRightCustomer = styled(Link)`
  margin-right: 10px;
`;
const NavbarRightCustomerIcon = styled(FontAwesomeIcon)`
  color: ${Colors.primary};
  font-size: 1.2rem;
`;
const NavbarRightToggle = styled.div`
  background-color: white;
  width: 25px;
  height: 2px;
  position: relative;
  border-radius: 5px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: -6px;
    background-color: inherit;
    width: 25px;
    height: 2px;
    border-radius: 5px;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 6px;
    background-color: inherit;
    width: 25px;
    height: 2px;
    border-radius: 5px;
  }
`;
const HeaderContent = styled.div`
  margin: 20px 0 10px 0;
  padding: 0 20px 20px 20px;
`;
const HeaderTitle = styled.h2`
  margin: 0;
  color: white;
`;
const HeaderDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;
const HeaderButtons = styled.div``;
