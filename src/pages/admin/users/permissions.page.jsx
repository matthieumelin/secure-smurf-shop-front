import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import moment from 'moment';

import axios from 'axios';
import { API_ENDPOINTS } from '../../../api/api';
import AppRoutes from '../../../router/app.routes';

import styled from 'styled-components'

import Navbar from '../../../components/admin/navbar.component';
import Sidebar from '../../../components/admin/sidebar.component';
import Pagination from "../../../components/utils/pagination.component"
import Colors from '../../../utils/colors.util';
import UserPermissionCard from '../../../components/admin/cards/user-permission-card.component';

export default function AdminUsers() {
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    const [permissions, setPermissions] = useState([]);
    const [searchedPermission, setSearchedPermission] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = permissions.slice(indexOfFirstRecord, indexOfLastRecord);
    const pages = Math.ceil(permissions.length / recordsPerPage);

    const isGranted = token && userData.permission.includes("admin");

    const haveResult = permissions && permissions.filter((permission) => permission.name.toLowerCase().includes(searchedPermission.toLowerCase())).length > 0;

    useEffect(() => {
        const fetchUsersPermissions = async () => {
            await axios.get(API_ENDPOINTS.USERS_PERMISSIONS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => setPermissions(res.data))
        }

        if (isGranted) fetchUsersPermissions();
    }, [token, isGranted])

    const onSearchPermissions = (event) => {
        setSearchedPermission(event.target.value);
    }

    const renderPermissionList = (permission) => {
        return (
            <UserPermissionCard data={permission} />
        )
    }

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin Permissions</title>
            </Helmet>
            <Wrapper>
                <WrapperLeft>
                    <Sidebar />
                </WrapperLeft>
                <WrapperRight>
                    <Navbar />
                    <Container>
                        <ContainerHeader>
                            <ContainerHeaderTitle>Manage Permissions</ContainerHeaderTitle>
                            <ContainerHeaderButtons>
                                <ContainerHeaderButtonsLink to={AppRoutes.Home}>Add Permission</ContainerHeaderButtonsLink>
                            </ContainerHeaderButtons>
                        </ContainerHeader>
                        <ContainerBody>
                            <List>
                                <ListHeader>
                                    <ListHeaderTitle>User Permissions ({permissions.length})</ListHeaderTitle>
                                    <ListHeaderSearch>
                                        <ListHeaderSearchIcon src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`} alt="Search Permission" />
                                        <ListHeaderSearchInput type='text' placeholder="Search Permission" onChange={onSearchPermissions} />
                                    </ListHeaderSearch>
                                </ListHeader>
                                <ListBody haveResult={haveResult}>
                                    {searchedPermission ? (
                                        haveResult ? (
                                            permissions.map((permission) => renderPermissionList(permission))
                                        ) : (
                                            <ListBodyNoMatch>No permission found..</ListBodyNoMatch>
                                        )
                                    ) : (
                                        currentRecords && currentRecords.map((currentRecord) => renderPermissionList(currentRecord))
                                    )}
                                </ListBody>
                            </List>
                            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </ContainerBody>
                    </Container>
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
const Container = styled.div`
padding:20px;`;
const ContainerHeader = styled.div`
@media screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
`;
const ContainerHeaderTitle = styled.h1`
color: white;
margin: 0;
`;
const ContainerHeaderButtons = styled.div`
margin: 20px 0;
display: grid;
grid-gap: 20px;
@media screen and (min-width: 1024px) {
    grid-template-columns: repeat(2, 200px);
}
`;
const ContainerHeaderButtonsLink = styled(Link)`
background-color: ${Colors.primary};
color: white;
text-decoration: none;
padding: 5px 10px;
display:block;
text-align: center;
border-radius: 2px;
transition: 0.2s;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;
const ContainerBody = styled.div``;
const List = styled.div`
margin: 30px 0;
`;
const ListHeader = styled.div`
@media screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
}
`;
const ListHeaderTitle = styled.h2`
margin: 0;
color: white;

@media screen and (min-width: 1024px) {
    margin: 0 20px 0 0;
}
`;
const ListHeaderSearch = styled.div`
display: flex;
align-items: center;
background-color: white;
border-radius: 20px;
padding: 10px 20px;
margin-top: 10px;
max-width: 320px;

@media screen and (min-width: 1024px) {
    margin-top: 0;
}
`;
const ListHeaderSearchIcon = styled.img`
width: 18px;
height: 18px;
display: block;
filter: invert(0%) sepia(5%) saturate(27%) hue-rotate(331deg) brightness(0%) contrast(100%);
margin-right: 10px;
`;
const ListHeaderSearchInput = styled.input`
background-color: transparent;
border: none;
font-family: inherit;
outline: none;
width: 100%;
`;
const ListBody = styled.div`
margin: 30px 0;

${props => {
        if (props.haveResult) {
            return `
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        `;
        }
    }}
`;
const ListBodyNoMatch = styled.h3`
color: white;
text-align: center;
`;