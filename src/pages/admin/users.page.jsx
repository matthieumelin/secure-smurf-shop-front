import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import moment from 'moment';

import axios from 'axios';
import { API_ENDPOINTS } from '../../api/api';
import AppRoutes from '../../router/app.routes';

import styled from 'styled-components'

import Navbar from '../../components/admin/navbar.component';
import Sidebar from '../../components/admin/sidebar.component';
import Pagination from "../../components/utils/pagination.component"

export default function AdminUsers() {
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    const [users, setUsers] = useState([]);

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

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
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
                                {currentRecords && currentRecords.map((currentRecord) => {
                                    return (
                                        <UsersTableRow key={`user_${currentRecord.id}`}>
                                            <UsersTableData data-label="ID">{currentRecord.id}</UsersTableData>
                                            <UsersTableData data-label="Email">{currentRecord.email}</UsersTableData>
                                            <UsersTableData data-label="Username">
                                                {currentRecord.username}
                                            </UsersTableData>
                                            <UsersTableData data-label="Rank">
                                                {currentRecord.permission}
                                            </UsersTableData>
                                            <UsersTableData data-label="Created Date">
                                                {moment(currentRecord.createdAt).format("L")}
                                            </UsersTableData>
                                        </UsersTableRow>
                                    );
                                })}
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
const Wrapper = styled.div``;
const WrapperLeft = styled.div``;
const WrapperRight = styled.div``;
const Users = styled.section``;
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
  @media screen and (max-width: 600px) {
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