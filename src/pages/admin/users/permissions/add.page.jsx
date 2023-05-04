import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { API_ENDPOINTS } from '../../../../api/api';
import AppRoutes from '../../../../router/app.routes';

import styled from 'styled-components'

import Navbar from '../../../../components/admin/navbar.component';
import Sidebar from '../../../../components/admin/sidebar.component';
import UserPermissionCard from '../../../../components/admin/cards/user-permission-card.component';

import Colors from '../../../../utils/colors.util';

export default function AdminUsersPermissionsAdd() {
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    const isGranted = token && userData.permission.includes("admin");

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin Add Permission</title>
            </Helmet>
            <Wrapper>
                <WrapperLeft>
                    <Sidebar />
                </WrapperLeft>
                <WrapperRight>
                    <Navbar />
                    <Container>
                        <ContainerHeader>
                            <ContainerHeaderTitle>Add Permission</ContainerHeaderTitle>
                        </ContainerHeader>
                        <ContainerBody>
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
const ContainerBody = styled.div``;