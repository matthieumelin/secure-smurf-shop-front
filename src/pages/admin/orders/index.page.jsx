import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { API_ENDPOINTS } from '../../../api/api';
import AppRoutes from '../../../router/app.routes';

import styled from 'styled-components'

import Navbar from '../../../components/admin/navbar.component';
import Sidebar from '../../../components/admin/sidebar.component';
import Pagination from "../../../components/utils/pagination.component"
import OrderCard from '../../../components/admin/cards/order-card.component';

import Colors from '../../../utils/colors.util';

export default function AdminOrders() {
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.data);

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);
    const pages = Math.ceil(orders.length / recordsPerPage);

    const isGranted = token && userData.permission.includes("admin");

    const haveResult = orders && orders.filter((order) => order.id === search.id).length > 0;

    useEffect(() => {
        const fetchOrders = async () => {
            await axios.get(API_ENDPOINTS.ORDERS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => { if (res.status === 200) setOrders(res.data) })
        }

        if (isGranted) fetchOrders();
    }, [token, isGranted])

    const renderList = (order) => {
        return (
            <OrderCard key={`order_${order.id}`} data={order} />
        )
    }

    if (!isGranted) {
        return <Navigate to={AppRoutes.Login} />
    }

    return (
        <StyledUsers>
            <Helmet>
                <title>Admin Orders</title>
            </Helmet>
            <Wrapper>
                <WrapperLeft>
                    <Sidebar />
                </WrapperLeft>
                <WrapperRight>
                    <Navbar />
                    <Container>
                        <ContainerHeader>
                            <ContainerHeaderTitle>Manage Orders</ContainerHeaderTitle>
                            <ContainerHeaderButtons>
                                {/* <ContainerHeaderButtonsLink to={AppRoutes.Home}>Add Order</ContainerHeaderButtonsLink> */}
                            </ContainerHeaderButtons>
                        </ContainerHeader>
                        <ContainerBody>
                            <List>
                                <ListHeader>
                                    <ListHeaderTitle>Orders List ({orders.length})</ListHeaderTitle>
                                    <ListHeaderSearch>
                                        <ListHeaderSearchIcon src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`} alt="Search Order" />
                                        <ListHeaderSearchInput type='text' placeholder="Search Order" onChange={(event) => setSearch(event.target.value)} />
                                    </ListHeaderSearch>
                                </ListHeader>
                                <ListBody haveResult={haveResult}>
                                    {search ? (
                                        haveResult ? (
                                            orders.map((order) => renderList(order))
                                        ) : (
                                            <ListBodyNoMatch>No order found..</ListBodyNoMatch>
                                        )
                                    ) : (
                                        currentRecords.length ? (
                                            currentRecords.map((currentRecord) => renderList(currentRecord))
                                        ) :
                                            (
                                                <ListBodyNoMatch>No orders</ListBodyNoMatch>
                                            )
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

@media screen and (min-width: 1024px) {
    display: flex;
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
margin: 20px 0;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }

  @media screen and (min-width: 1024px) {
    margin: 0 0 0 20px;
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