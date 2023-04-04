import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import styled from "styled-components";

import AdminNavbar from "../../../components/admin/navbar.component";
import AdminSidebar from "../../../components/admin/sidebar.component";

import axios from "axios";
import { API_ENDPOINTS } from "../../../api/api";
import { Navigate } from "react-router-dom";
import AppRoutes from "../../../router/app.routes";
import Colors from "../../../utils/colors.util";
import { capitalizeFirstLetter } from "../../../utils/string.util";

export default function AdminUserPermissions() {
  const [userPermissions, setUserPermissions] = useState([]);

  const token = useSelector((state) => state.user.token);
  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(API_ENDPOINTS.USER_PERMISSIONS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUserPermissions(res.data))
        .catch((err) => console.error(err));
    };

    fetchData();
  }, []);

  if (!token || !userData.permission.includes("admin")) {
    return <Navigate to={AppRoutes.Home} />;
  }

  return (
    <StyledAdminPermissions>
      <Helmet>
        <title>Admin User Permissions</title>
      </Helmet>
      <Wrapper>
        <AdminSidebar />
        <Main>
          <AdminNavbar />
          <MainHeader>
            <MainHeaderTitle>
              User Permissions
              <MainHeaderTitleSpan>
                ({userPermissions.length})
              </MainHeaderTitleSpan>
            </MainHeaderTitle>
          </MainHeader>
          <MainBody>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">ID</TableHead>
                  <TableHead scope="col">Name</TableHead>
                  <TableHead scope="col">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userPermissions.map((userPermission, index) => {
                  return (
                    <TableRow key={`user_permissions_${index}`}>
                      <TableData data-label="ID">{userPermission.id}</TableData>
                      <TableData data-label="Name">
                        {capitalizeFirstLetter(userPermission.name)}
                      </TableData>
                      <TableData data-label="Actions">
                        <TableDataButton>Edit</TableDataButton>
                        <TableDataButton>Delete</TableDataButton>
                      </TableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </MainBody>
        </Main>
      </Wrapper>
    </StyledAdminPermissions>
  );
}

const StyledAdminPermissions = styled.div``;
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
const MainHeaderTitleSpan = styled.span`
  color: ${Colors.primary};
`;
const MainBody = styled.div`
  padding: 0 30px;
`;
const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

  @media screen and (max-width: 600px) {
    border: 0;
  }
`;
const TableHeader = styled.thead`
  @media screen and (max-width: 600px) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;
const TableRow = styled.tr`
  background-color: transparent;
  border: 1px solid ${Colors.primary};
  padding: 0.35em;

  @media screen and (max-width: 600px) {
    display: block;
    margin-bottom: 0.625em;
  }
`;
const TableHead = styled.th`
  padding: 0.625em;
  text-align: center;
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
`;
const TableBody = styled.tbody``;
const TableData = styled.td`
  padding: 0.625em;
  text-align: center;
  color: white;

  @media screen and (max-width: 600px) {
    border-bottom: 1px solid ${Colors.primary};
    display: block;
    font-size: 0.8em;
    text-align: right;

    &::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    &:last-child {
      border-bottom: 0;
    }
  }
`;
const TableDataButton = styled.button`
  padding: 0.7rem;
  background-image: linear-gradient(
    147.16deg,
    #5a189a 13.82%,
    #7b2cbf 35.53%,
    #9d4edd 76.05%
  );
  border: none;
  border-radius: 100px;
  box-shadow: 0px 4px 34px rgb(157 78 221 / 40%);
  margin: 0 0 0 10px;

  &:last-child {
    background-image: linear-gradient(
      147.16deg,
      #d62828 13.82%,
      #a81d1d 35.53%,
      #8d1a1a 76.05%
    );
    box-shadow: 0px 4px 34px rgb(214 40 40 / 40%);
  }
`;
