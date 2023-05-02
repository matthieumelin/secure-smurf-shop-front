import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';

import styled from 'styled-components'

import Colors from "../../utils/colors.util"

import AppRoutes from "../../router/app.routes"

export default function Sidebar() {
  const location = useLocation();

  return (
    <StyledSidebar>
      <SidebarBrand>Secure Smurf</SidebarBrand>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuItemLink to={AppRoutes.AdminDashboard} active={location.pathname === AppRoutes.AdminDashboard ? "true" : "false"}>
            <SidebarMenuItemLinkIcon src={`${process.env.PUBLIC_URL}/assets/icons/home.svg`} alt="Dashboard" /> Dashboard</SidebarMenuItemLink>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuItemLink to={AppRoutes.AdminUsers} active={location.pathname.includes(AppRoutes.AdminUsers) ? "true" : "false"}>
            <SidebarMenuItemLinkIcon src={`${process.env.PUBLIC_URL}/assets/icons/profile.svg`} alt="Users" /> Users</SidebarMenuItemLink>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuItemLink to={AppRoutes.AdminOrders} active={location.pathname.includes(AppRoutes.AdminOrders) ? "true" : "false"}>
            <SidebarMenuItemLinkIcon src={`${process.env.PUBLIC_URL}/assets/icons/order.svg`} alt="Orders" /> Orders</SidebarMenuItemLink>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuItemLink to={AppRoutes.AdminProducts} active={location.pathname.includes(AppRoutes.AdminProducts) ? "true" : "false"}>
            <SidebarMenuItemLinkIcon src={`${process.env.PUBLIC_URL}/assets/icons/product.svg`} alt="Products" /> Products</SidebarMenuItemLink>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarLogout to={AppRoutes.Logout}>
        <SidebarLogoutIcon src={`${process.env.PUBLIC_URL}/assets/icons/logout.svg`} alt="Logout" /> Logout</SidebarLogout>
    </StyledSidebar>
  )
}

const StyledSidebar = styled.aside`
padding: 20px;
`;
const SidebarBrand = styled.h1`
margin: 0;
color: ${Colors.primary};
`;
const SidebarMenu = styled.ul`
list-style: none;
padding: 0;
`;
const SidebarMenuItem = styled.li``;
const SidebarMenuItemLink = styled(NavLink)`
display: flex;
align-items: center;
text-decoration: none;
color: rgba(255,255,255,.7);
padding: 5px 0;
transition: 0.2s;

&:hover {
  transition: 0.2s;
  color: white;
}

${props => {
    if (props.active === "true") {
      return `
    font-weight: 600;
    color: white;
    `;
    }
  }}
`;
const SidebarMenuItemLinkIcon = styled.img`
margin-right: 20px;
width: 18px;
height: 18px;
opacity: 0.7;
display: block;
transition: 0.2s;

${SidebarMenuItemLink}:hover & {
  opacity: 1;
  transition: 0.2s;
}

${SidebarMenuItemLink}[active=true] & {
  opacity: 1;
}
`;
const SidebarLogout = styled(Link)`
color: ${Colors.red};
text-decoration: none;
display: flex;
align-items: center;
`;
const SidebarLogoutIcon = styled.img`
margin-right: 10px;
display: block;
filter: invert(39%) sepia(96%) saturate(5600%) hue-rotate(346deg) brightness(85%) contrast(96%);
`;