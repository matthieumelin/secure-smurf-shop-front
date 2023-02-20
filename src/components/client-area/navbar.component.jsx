import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Colors from "../../utils/colors.util";

export default function Navbar({ setSidebarIsOpen }) {
  return (
    <StyledNavbar>
      <NavbarLeft>
        <NavbarToggle onClick={() => setSidebarIsOpen(true)}>
          <NavbarToggleIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/hamburger.svg`}
            alt="Navbar"
          />
        </NavbarToggle>
        <Link to="/">
          <NavbarLogo
            src={`${process.env.PUBLIC_URL}/assets/images/logo_white.png`}
            alt={process.env.REACT_APP_NAME}
          />
        </Link>
      </NavbarLeft>
      <NavbarCenter>
        <NavbarIcon
          src={`${process.env.PUBLIC_URL}/assets/icons/bell.svg`}
          alt="Notifications"
        />
        <NavbarIcon
          src={`${process.env.PUBLIC_URL}/assets/icons/bubble.svg`}
          alt="Messages"
        />
      </NavbarCenter>
      <NavbarRight>
        <NavbarBuy>
          <NavbarBuyIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/add.svg`}
            alt="Buy"
          />
        </NavbarBuy>
      </NavbarRight>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  background-color: ${Colors.primaryLowOp};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
const NavbarLeft = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
const NavbarCenter = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  align-items: center;
`;
const NavbarRight = styled.div``;
const NavbarLogo = styled.img`
  display: block;
  width: 48px;
  height: 48px;
`;
const NavbarToggle = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const NavbarToggleIcon = styled.img`
  display: block;
`;
const NavbarIcon = styled.img``;
const NavbarBuy = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  background-image: linear-gradient(
    147.16deg,
    #5a189a 13.82%,
    #7b2cbf 35.53%,
    #9d4edd 76.05%
  );
  border-radius: 100px;
  box-shadow: 0px 4px 34px rgb(157 78 221 / 40%);
`;
const NavbarBuyIcon = styled.img``;
