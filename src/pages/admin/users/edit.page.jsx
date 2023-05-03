import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { API_ENDPOINTS } from '../../../api/api';
import AppRoutes from '../../../router/app.routes';

import styled from 'styled-components'

import Navbar from '../../../components/admin/navbar.component';
import Sidebar from '../../../components/admin/sidebar.component';
import Pagination from "../../../components/utils/pagination.component"
import Colors from '../../../utils/colors.util';

export default function AdminUsers() {
    const { id } = useParams();

    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    const [user, setUser] = useState({});

    const isGranted = token && userData.permission.includes("admin") && id;

    useEffect(() => {
        const fetchUser = async () => {
            await axios.get(`${API_ENDPOINTS.USERS}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => setUser(res.data))
        }

        if (isGranted) fetchUser();
    }, [token, isGranted, id])

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin User</title>
            </Helmet>
            <Wrapper>
                <WrapperLeft>
                    <Sidebar />
                </WrapperLeft>
                <WrapperRight>
                    <Navbar title={user.username} />
                    <Users>
                        <UsersNavigation>
                            <UsersNavigationMenu>
                                <UsersNavigationMenuItem>
                                    <UsersNavigationMenuItemLink to={AppRoutes.AdminUsersPermissions}>Disable</UsersNavigationMenuItemLink>
                                </UsersNavigationMenuItem>
                                <UsersNavigationMenuItem>
                                    <UsersNavigationMenuItemLink to={AppRoutes.AdminUsersPermissions}>Disable</UsersNavigationMenuItemLink>
                                </UsersNavigationMenuItem>
                                <UsersNavigationMenuItem>
                                    <UsersNavigationMenuItemLink to={AppRoutes.AdminUsersPermissions}>Disable</UsersNavigationMenuItemLink>
                                </UsersNavigationMenuItem>
                            </UsersNavigationMenu>
                        </UsersNavigation>
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
padding: 5px 15px;
text-decoration: none;
transition: 0.2s;

&:hover {
    transition: 0.2s;
    color: white;
    background-color: ${Colors.primary};
}
`;