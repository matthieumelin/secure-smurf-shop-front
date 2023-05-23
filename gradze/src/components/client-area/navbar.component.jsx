import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";

import AppRoutes from "../../router/app.routes";

export default function Navbar({ setSidebarIsOpen }) {
  const user = useSelector((state) => state.user.data);

  return (
    <StyledNavbar>
      <NavbarLeft>
        <NavbarToggle onClick={() => setSidebarIsOpen(true)}>
          <NavbarToggleIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/hamburger.svg`}
            alt="Navbar"
          />
        </NavbarToggle>
        <Link to={AppRoutes.Home}>
          <NavbarLogo
            src={`${process.env.PUBLIC_URL}/assets/images/logo_white.png`}
            alt={process.env.REACT_APP_NAME}
          />
        </Link>
      </NavbarLeft>
      <NavbarRight>
        {user.permission.includes("admin") && (
          <NavbarRightButton type="admin" to={AppRoutes.AdminDashboard}>
            <NavbarRightButtonIcon type="admin"
              src={`${process.env.PUBLIC_URL}/assets/icons/gear.svg`}
              alt="Admin dashboard"
            />
            Admin
          </NavbarRightButton>
        )}
        <NavbarRightButton to={AppRoutes.Home}>
          <NavbarRightButtonIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/add.svg`}
            alt="Store"
          />
        </NavbarRightButton>
      </NavbarRight>
    </StyledNavbar >
  );
}

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const NavbarLeft = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
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
  cursor: pointer;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const NavbarToggleIcon = styled.img`
  display: block;
`;
const NavbarRight = styled.div`
display: flex;
`;
const NavbarRightButton = styled(Link)`
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
  margin: 0 0 0 10px;

  ${(props) => {
    if (props.type === "admin") {
      return `
      color: white;
      padding: 0.3rem 1rem;
      text-decoration: none;
      background-image: linear-gradient(
        147.16deg,
        #d62828 13.82%,
        #A81D1D 35.53%,
        #8D1A1A 76.05%
      );
      box-shadow: 0px 4px 34px rgb(214 40 40 / 40%);
      `;
    }
  }}
`;
const NavbarRightButtonIcon = styled.img`
  display: block;
  width: 14px;
  height: 14px;

  ${(props) => {
    if (props.type === "admin") {
      return `
      margin-right: 5px;
      `;
    }
  }}
`;
