import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import styled from "styled-components";

import AdminNavbar from "../../../components/admin/navbar.component";
import AdminSidebar from "../../../components/admin/sidebar.component";

import AppRoutes from "../../../router/app.routes";

import Colors from "../../../utils/colors.util";

export default function AdminUsers() {
  return (
    <StyledAdminIndex>
      <Helmet>
        <title>Admin Users</title>
      </Helmet>
      <Wrapper>
        <AdminSidebar />
        <Main>
          <AdminNavbar />
          <MainHeader>
            <MainHeaderTitle>Users</MainHeaderTitle>
            <MainHeaderNavigation>
              <MainHeaderNavigationItem>
                <MainHeaderNavigationItemLink
                  to={AppRoutes.AdminUserPermissions}
                >
                  Manage Roles
                </MainHeaderNavigationItemLink>
              </MainHeaderNavigationItem>
            </MainHeaderNavigation>
          </MainHeader>
          <MainBody></MainBody>
        </Main>
      </Wrapper>
    </StyledAdminIndex>
  );
}

const StyledAdminIndex = styled.div``;
const Wrapper = styled.div`
  display: flex;
`;
const Main = styled.main`
  width: 100%;
`;
const MainHeader = styled.div`
  padding: 20px;
`;
const MainHeaderTitle = styled.h1`
  margin: 0;
  color: white;
`;
const MainHeaderNavigation = styled.ul`
  list-style: none;
  padding: 0;
`;
const MainHeaderNavigationItem = styled.li``;
const MainHeaderNavigationItemLink = styled(Link)`
  text-decoration: none;
  color: ${Colors.primary};
  border: 1px solid ${Colors.primary};
  border-radius: 10px;
  padding: 5px 10px;
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    background-color: ${Colors.primary};
    color: white;
  }
`;
const MainBody = styled.div`
  padding: 0 30px;
`;
