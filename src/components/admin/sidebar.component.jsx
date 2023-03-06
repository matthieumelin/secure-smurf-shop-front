import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import AppRoutes from "../../router/app.routes";

import Colors from "../../utils/colors.util";

export default function AdminSidebar() {
  return (
    <StyledAdminSidebar>
      <AdminSidebarMenu>
        <AdminSidebarMenuItem>
          <AdminSidebarMenuItemLink to={AppRoutes.AdminDashboard}>
            <AdminSidebarMenuItemLinkIcon
              src={`${process.env.PUBLIC_URL}/assets/icons/home.svg`}
              alt="Dashboard"
            />
          </AdminSidebarMenuItemLink>
        </AdminSidebarMenuItem>
        <AdminSidebarMenuItem>
          <AdminSidebarMenuItemLink to={AppRoutes.AdminOrders}>
            <AdminSidebarMenuItemLinkIcon
              src={`${process.env.PUBLIC_URL}/assets/icons/order.svg`}
              alt="Orders"
            />
          </AdminSidebarMenuItemLink>
        </AdminSidebarMenuItem>
        <AdminSidebarMenuItem>
          <AdminSidebarMenuItemLink to={AppRoutes.AdminProducts}>
            <AdminSidebarMenuItemLinkIcon
              src={`${process.env.PUBLIC_URL}/assets/icons/product.svg`}
              alt="Products"
            />
          </AdminSidebarMenuItemLink>
        </AdminSidebarMenuItem>
        <AdminSidebarMenuItem>
          <AdminSidebarMenuItemLink to={AppRoutes.AdminServers}>
            <AdminSidebarMenuItemLinkIcon
              src={`${process.env.PUBLIC_URL}/assets/icons/server.svg`}
              alt="Servers"
            />
          </AdminSidebarMenuItemLink>
        </AdminSidebarMenuItem>
        <AdminSidebarMenuItem>
          <AdminSidebarMenuItemLink to={AppRoutes.AdminUsers}>
            <AdminSidebarMenuItemLinkIcon
              src={`${process.env.PUBLIC_URL}/assets/icons/profile.svg`}
              alt="Users"
            />
          </AdminSidebarMenuItemLink>
        </AdminSidebarMenuItem>
      </AdminSidebarMenu>
    </StyledAdminSidebar>
  );
}

const StyledAdminSidebar = styled.aside`
  background-color: ${Colors.primary};
  padding: 20px;
  height: 100vh;
  box-shadow: 0 0 4px rgb(0 0 0 / 7%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AdminSidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 20px;
`;
const AdminSidebarMenuItem = styled.li``;
const AdminSidebarMenuItemLink = styled(Link)``;
const AdminSidebarMenuItemLinkIcon = styled.img`
  display: block;
  width: 18px;
  height: 18px;
`;
