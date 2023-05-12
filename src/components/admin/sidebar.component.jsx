import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components'
import AppRoutes from '../../router/app.routes'

export default function Sidebar() {
  // Router
  const { pathname } = useLocation();

  // States
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <StyledSidebar>
      <SidebarWrapper>
        <SidebarWrapperLink to={AppRoutes.Home}>
          <SidebarWrapperBrand src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt={process.env.REACT_APP_NAME} />
        </SidebarWrapperLink>
        <SidebarWrapperToggle isOpen={isOpen} type='button' onClick={() => onToggle()} />
      </SidebarWrapper>
      <SidebarMenus isOpen={isOpen}>
        <SidebarMenu>
          <SidebarMenuTitle>Analytics</SidebarMenuTitle>
          <SidebarMenuList>
            <SidebarMenuListItem>
              <SidebarMenuListItemLink to={AppRoutes.AdminDashboard}
                data-active={pathname === AppRoutes.AdminDashboard}>
                <SidebarMenuListItemLinkIcon src={`${process.env.PUBLIC_URL}/assets/icons/home.svg`} alt="Dashboard" /> Dashboard
              </SidebarMenuListItemLink>
            </SidebarMenuListItem>
          </SidebarMenuList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuTitle>Users</SidebarMenuTitle>
          <SidebarMenuList>
            <SidebarMenuListItem>
              <SidebarMenuListItemLink to={AppRoutes.AdminUsers}
                data-active={pathname === AppRoutes.AdminUsers}>
                <SidebarMenuListItemLinkIcon src={`${process.env.PUBLIC_URL}/assets/icons/profile.svg`} alt="Users" /> Users
              </SidebarMenuListItemLink>
            </SidebarMenuListItem>
            {/* <SidebarMenuListItem>
              <SidebarMenuListItemLink to={AppRoutes.AdminUserPermissions}
                data-active={pathname.includes(AppRoutes.AdminUserPermissions)}>
                <SidebarMenuListItemLinkIcon src={`${process.env.PUBLIC_URL}/assets/icons/profile.svg`} alt="Permissions" /> Permissions
              </SidebarMenuListItemLink>
            </SidebarMenuListItem> */}
          </SidebarMenuList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuTitle>Products</SidebarMenuTitle>
          <SidebarMenuList>
            <SidebarMenuListItem>
              <SidebarMenuListItemLink to={AppRoutes.AdminProducts}
                data-active={pathname === AppRoutes.AdminProducts}>
                <SidebarMenuListItemLinkIcon src={`${process.env.PUBLIC_URL}/assets/icons/product.svg`} alt="Products" /> Products
              </SidebarMenuListItemLink>
            </SidebarMenuListItem>
            <SidebarMenuListItem>
              <SidebarMenuListItemLink to={AppRoutes.AdminProductRegions}
                data-active={pathname.includes(AppRoutes.AdminProductRegions)}>
                <SidebarMenuListItemLinkIcon src={`${process.env.PUBLIC_URL}/assets/icons/flag.svg`} alt="Regions" /> Regions
              </SidebarMenuListItemLink>
            </SidebarMenuListItem>
          </SidebarMenuList>
        </SidebarMenu>
      </SidebarMenus>
    </StyledSidebar >
  )
}

const StyledSidebar = styled.aside`
padding: 20px;

@media screen and (min-width: 1024px) {
  height: 100vh;
  border-right: 1px solid rgba(255,255,255,.1);
}
`;
const SidebarWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 20px;
`;
const SidebarWrapperLink = styled(Link)``;
const SidebarWrapperToggle = styled.div`
background-color: white;
border-radius: 2px;
border: none;
width: 22px;
height: 1px;
position: relative;

&::before {
  content: "";
  position: absolute;
  left: 0;
  top: -7px;
  background-color: white;
  width: 22px;
  height: 1px;
  border-radius: 2px;
  transition: 0.5s all ease;
}

&::after {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  background-color: white;
  width: 22px;
  height: 1px;
  border-radius: 2px;
  transition: 0.5s all ease;
}

${props => {
    if (props.isOpen) {
      return `
      &::before {
        content: "";
        transition: 0.5s all ease;
        transform: rotate(45deg);
        left: 0;
        top: 0;
      }
      &::after {
        content: "";
        transition: 0.5s all ease;
        transform: rotate(-45deg);
        left: 0;
        top: 0;
      }
      background-color: transparent;
  `;
    }
  }}

@media screen and (min-width: 1024px) {
  display: none;
}
`;
const SidebarWrapperBrand = styled.img`
display: block;
width: 42px;
height: 42px;
background-color: white;
border-radius: 10px;
padding: 5px;
`;
const SidebarMenus = styled.div`
margin-top: 20px;
max-height: 0;
-webkit-transition: max-height 0.5s ease;
-moz-transition: max-height 0.5s ease;
-ms-transition: max-height 0.5s ease;
-o-transition: max-height 0.5s ease;
transition: max-height 0.5ss, margin-left 0s 0.5s ease;
overflow: hidden;

${props => {
    if (props.isOpen) {
      return `
    max-height: 100vh;
    transition: max-height 0.5s, margin-left 0s 0s ease;
    `;
    }
  }}

  @media screen and (min-width: 1024px) {
    max-height: initial;
  }
`;
const SidebarMenu = styled.div`
`;
const SidebarMenuTitle = styled.p`
color: rgba(255,255,255,.3);
font-size: .85rem;
text-transform: uppercase;
margin-left: 20px;
`;
const SidebarMenuList = styled.ul`
list-style: none;
padding: 0;
`;
const SidebarMenuListItem = styled.li``;
const SidebarMenuListItemLink = styled(Link)`
text-decoration: none;
display: flex;
align-items: center;
color: rgba(255,255,255,.5);
transition: 0.2s;
padding: 8px 20px;
white-space: nowrap;

&:hover, &[data-active=true] {
  background-color: rgba(255,255,255,.1);
  padding: 8px 20px;
  transition: 0.2s;
  color: white;
  border-radius: 10px;
}
`;
const SidebarMenuListItemLinkIcon = styled.img`
display: block;
width: 18px;
height: 18px;
margin-right: 10px;
opacity: 0.5;
transition: 0.2s;

${SidebarMenuListItemLink}:hover, ${SidebarMenuListItemLink}.active & {
  opacity: 1;
  transition: 0.2s;
}
`;