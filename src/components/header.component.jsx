import React from "react";

import { faUser } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import Colors from "../utils/colors.util";
import Button from "./utils/button.component";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <StyledHeader>
      <Navbar>
        <NavbarWrapper>
          <NavbarBrand>Secure Smurf Shop</NavbarBrand>
          <NavbarRight>
            <NavbarRightCustomer>
              <NavbarRightCustomerIcon icon={faUser} />
            </NavbarRightCustomer>
            <NavbarRightToggle />
          </NavbarRight>
        </NavbarWrapper>
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
  padding: 20px;
`;
const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  height: 1px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: -5px;
    background-color: inherit;
    width: 25px;
    height: 1px;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 5px;
    background-color: inherit;
    width: 25px;
    height: 1px;
  }
`;
const HeaderContent = styled.div`
  padding: 20px;
`;
const HeaderTitle = styled.h2`
margin: 0;
color: white;
`;
const HeaderDescription = styled.p`
color: rgba(255,255,255,0.7);
`;
const HeaderButtons = styled.div``;
