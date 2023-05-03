import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import moment from 'moment';

import axios from 'axios';
import { API_ENDPOINTS } from '../../api/api';
import AppRoutes from '../../router/app.routes';

import styled from 'styled-components'

import Navbar from '../../components/admin/navbar.component';
import Sidebar from '../../components/admin/sidebar.component';
import Pagination from "../../components/utils/pagination.component"
import Colors from '../../utils/colors.util';

export default function AdminUsers() {
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    const [users, setUsers] = useState([]);
    const [searchedUser, setSearchedUser] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
    const pages = Math.ceil(users.length / recordsPerPage);

    const isGranted = token && userData.permission.includes("admin");

    useEffect(() => {
        const fetchUsers = async () => {
            await axios.get(API_ENDPOINTS.USERS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => setUsers(res.data))
        }

        if (isGranted) fetchUsers();
    }, [token, isGranted])

    const onSearchUsers = (event) => {
        setSearchedUser(event.target.value);
    }

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    const renderUsersTable = (data) => {
        return (
            <UsersTableRow key={`user_${data.id}`}>
                <UsersTableData data-label="ID">{data.id}</UsersTableData>
                <UsersTableData data-label="Email">{data.email}</UsersTableData>
                <UsersTableData data-label="Username">
                    {data.username}
                </UsersTableData>
                <UsersTableData data-label="Rank">
                    {data.permission}
                </UsersTableData>
                <UsersTableData data-label="Created Date">
                    {moment(data.createdAt).format("L")}
                </UsersTableData>
            </UsersTableRow>
        );
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin Users</title>
            </Helmet>
            <Wrapper>
                <WrapperLeft>
                    <Sidebar />
                </WrapperLeft>
                <WrapperRight>
                    <Navbar title={"Users"} />
                    <Users>
                        <UsersNavigation>
                            <UsersNavigationMenu>
                                <UsersNavigationMenuItem>
                                    <UsersNavigationMenuItemLink to={AppRoutes.AdminUsersPermissions}>Manage Permissions</UsersNavigationMenuItemLink>
                                </UsersNavigationMenuItem>
                            </UsersNavigationMenu>
                            <UsersNavigationSearch>
                                <UsersNavigationSearchIcon src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`} alt="Search users" />
                                <UsersNavigationSearchInput type='text' placeholder="Search users.." onChange={onSearchUsers} />
                            </UsersNavigationSearch>
                        </UsersNavigation>
                        <UsersTable>
                            <UsersTableHeader>
                                <UsersTableRow>
                                    <UsersTableHead scope="col">ID</UsersTableHead>
                                    <UsersTableHead scope="col">Email</UsersTableHead>
                                    <UsersTableHead scope="col">Username</UsersTableHead>
                                    <UsersTableHead scope="col">Rank</UsersTableHead>
                                    <UsersTableHead scope="col">Created Date</UsersTableHead>
                                </UsersTableRow>
                            </UsersTableHeader>
                            <UsersTableBody>
                                {searchedUser ? (
                                    users && users.filter((user) => user.email.toLowerCase().includes(searchedUser.toLowerCase()) || user.username.toLowerCase().includes(searchedUser.toLowerCase())).length > 0 ? (
                                        users.map((user) => renderUsersTable(user))
                                    ) : (
                                        <UsersTableData active>No record found.</UsersTableData>
                                    )
                                ) : (
                                    currentRecords && currentRecords.map((currentRecord) => renderUsersTable(currentRecord))
                                )}

                            </UsersTableBody>
                        </UsersTable>
                        <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </Users>
                </WrapperRight>
            </Wrapper>
        </StyledUsers>
    )
}

const StyledUsers = styled.div``;
const Wrapper = styled.div`
@media screen and (min-width: 1024px) {
    display: flex;
  }
`;
const WrapperLeft = styled.div``;
const WrapperRight = styled.div`
width: 100%;
`;
const Users = styled.section``;
const UsersNavigation = styled.nav`
padding: 0 20px;
`;
const UsersNavigationMenu = styled.ul`
list-style: none;
padding: 0;
`;
const UsersNavigationMenuItem = styled.li``;
const UsersNavigationMenuItemLink = styled(Link)`
color: ${Colors.primary};
border: 1px solid ${Colors.primary};
padding: 0px 10px;
text-decoration: none;
transition: 0.2s;

&:hover {
    transition: 0.2s;
    color: white;
    background-color: ${Colors.primary};
}
`;
const UsersNavigationSearch = styled.div`
display: flex;
align-items: center;
border: 1px solid white;
border-radius: 2px;
padding: 5px 10px;
margin: 20px 0;
`;
const UsersNavigationSearchIcon = styled.img`
width: 18px;
height: 18px;
display: block;
margin-right: 10px;
`;
const UsersNavigationSearchInput = styled.input`
background-color: transparent;
border: none;
font-family: inherit;
color: white;
width: 100%;
outline: none;
`;
const UsersTable = styled.table`
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  @media screen and (max-width: 600px) {
    border: 0;
  }
`;
const UsersTableHeader = styled.thead`
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
const UsersTableRow = styled.tr`
  background-color: transparent;
  padding: 0.35em;
  @media screen and (max-width: 600px) {
    display: block;
    margin-bottom: 0.625em;
  }
`;
const UsersTableHead = styled.th`
  padding: 0.625em;
  text-align: center;
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
`;
const UsersTableBody = styled.tbody``;
const UsersTableData = styled.td`
  padding: 0.625em;
  text-align: center;
  color: white;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 600px) {
    display: block;
    font-size: 0.8em;
    text-align: right;
    width: 100%;

    ${props => {
        if (props.active) {
            return `
            text-align: center;
            `;
        }
    }}

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