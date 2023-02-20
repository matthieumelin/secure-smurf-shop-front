import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import styled from "styled-components";

import Colors from "../../utils/colors.util";

export default function Header({ sidebarIsOpen, setSidebarIsOpen }) {
  const location = useLocation();

  return (
    <StyledHeader>
      <Sidebar sidebarIsOpen={sidebarIsOpen}>
        <SidebarLogo
          src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
          alt={process.env.REACT_APP_NAME}
        />
        <SidebarCloseButton onClick={() => setSidebarIsOpen(false)}>
          <SidebarCloseButtonIcon
            src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`}
            alt="Close"
          />
        </SidebarCloseButton>
        <SidebarMenuContainer>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuItemLink
                to="/client-area"
                data-active={location.pathname.includes("/client-area")}
              >
                <SidebarMenuItemLinkIcon
                  src={`${process.env.PUBLIC_URL}/assets/icons/home.svg`}
                  alt="Home"
                />
                Home
              </SidebarMenuItemLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuItemLink
                to="/orders"
                data-active={location.pathname.includes("/orders")}
              >
                <SidebarMenuItemLinkIcon
                  src={`${process.env.PUBLIC_URL}/assets/icons/orders.svg`}
                  alt="Orders"
                />
                Orders
              </SidebarMenuItemLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuItemLink
                to="/profile"
                data-active={location.pathname.includes("/profile")}
              >
                <SidebarMenuItemLinkIcon
                  src={`${process.env.PUBLIC_URL}/assets/icons/profile.svg`}
                  alt="Profile"
                />
                Profile
              </SidebarMenuItemLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarMenuContainer>
        <NavLink to="/logout">
          <SidebarLogoutButton>
            <SidebarLogoutButtonIcon
              src={`${process.env.PUBLIC_URL}/assets/icons/logout.svg`}
              alt="Logout"
            />
          </SidebarLogoutButton>
        </NavLink>
      </Sidebar>
    </StyledHeader>
  );
}

const StyledHeader = styled.header``;
const Sidebar = styled.aside`
  background-color: ${Colors.gray};
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  -webkit-transition: max-width 0.5s ease;
  -moz-transition: max-width 0.5s ease;
  -ms-transition: max-width 0.5s ease;
  -o-transition: max-width 0.5s ease;
  transition: max-width 0.5s ease;
  overflow: hidden;
  max-width: 0px;
  opacity: 0;
  padding: 0 20px 0 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  @media screen and (min-width: 1024px) {
    opacity: 1;
    overflow: hidden;
    white-space: nowrap;
    max-width: 120px;
    -webkit-transition: max-width 0.5s ease;
    -moz-transition: max-width 0.5s ease;
    -ms-transition: max-width 0.5s ease;
    -o-transition: max-width 0.5s ease;
    transition: max-width 0.5s ease;
  }

  ${(props) => {
    if (props.sidebarIsOpen) {
      return `
      opacity: 1;
      overflow: hidden;
      white-space: nowrap;
      max-width: 120px;
      -webkit-transition: max-width 0.5s ease;
      -moz-transition: max-width 0.5s ease;
      -ms-transition: max-width 0.5s ease;
      -o-transition: max-width 0.5s ease;
      transition: max-width 0.5s ease;
        box-shadow: 0px 4px 34px rgb(0 0 0 / 40%);
      `;
    }
  }}
`;
const SidebarLogo = styled.img`
  display: none;
  height: 60px;
  width: 60px;
  margin: 20px;

  @media screen and (min-width: 1024px) {
    display: block;
  }
`;
const SidebarCloseButton = styled.button`
  border-radius: 100px;
  height: 40px;
  width: 40px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const SidebarCloseButtonIcon = styled.img`
  display: block;
`;
const SidebarMenuContainer = styled.div`
  background: url(${process.env.PUBLIC_URL}/assets/images/navbar_bg.png)
    no-repeat;
  background-size: 100% 100%;
  height: 478px;
  width: 90px;
  position: relative;
`;
const SidebarMenu = styled.ul`
  padding: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style: none;
`;
const SidebarMenuItem = styled.li`
  margin: 30px 0 0 0;
`;
const SidebarMenuItemLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: 0.2s;

  &[data-active="true"] {
    color: white;
  }
  &:hover {
    transition: 0.2s;
    color: white;
  }
`;
const SidebarMenuItemLinkIcon = styled.img`
  display: block;
  opacity: 0.7;

  ${SidebarMenuItemLink}[data-active=true] & {
    opacity: 1;
  }

  ${SidebarMenuItemLink}:hover & {
    opacity: 1;
  }
`;
const SidebarLogoutButton = styled.button`
  background-color: ${Colors.primaryLowOp};
  height: 56px;
  width: 56px;
  border: none;
  margin: 20px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SidebarLogoutButtonIcon = styled.img`
  display: block;
`;
