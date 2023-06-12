import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

import axios from 'axios';
import AppRoutes from '../../router/app.routes';
import { API_ENDPOINTS } from "../../api/api"

import styled from 'styled-components'

import CardStat from '../../components/admin/cards/card-stat.component';
import Navbar from '../../components/admin/navbar.component';
import Sidebar from '../../components/admin/sidebar.component';

export default function AdminIndex() {
  const token = useSelector((state) => state.user.token);
  const userData = useSelector((state) => state.user.data);

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const isGranted = token && userData.permission.includes("admin");

  useEffect(() => {
    const fetchUsers = async () => {
      await axios.get(API_ENDPOINTS.USERS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => { if (res.status === 200) setUsers(res.data) })
    }

    const fetchOrders = async () => {
      await axios.get(API_ENDPOINTS.ORDERS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => { if (res.status === 200) setOrders(res.data) })
    }

    const fetchProducts = async () => {
      await axios.get(API_ENDPOINTS.PRODUCTS).then((res) => { if (res.status === 200) setProducts(res.data) })
    }

    if (isGranted) {
      fetchUsers();
      fetchOrders();
      fetchProducts();
    };
  }, [isGranted, token]);

  if (!isGranted) {
    return <Navigate to={AppRoutes.Login} />
  }

  return (
    <StyledIndex>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Wrapper>
        <WrapperLeft>
          <Sidebar />
        </WrapperLeft>
        <WrapperRight>
          <Navbar />
          <Container>
            <ContainerHeader>
              <ContainerHeaderTitle>
                Welcome, {userData.username}
              </ContainerHeaderTitle>
            </ContainerHeader>
            <ContainerBody>
              <CardStats>
                <CardStat data={{ icon: "profile.svg", title: "Users", value: users.length }} />
                <CardStat data={{ icon: "order.svg", title: "Orders", value: orders.length }} />
                <CardStat data={{ icon: "product.svg", title: "Products", value: products.filter((product) => !product.disabled).length }} />
              </CardStats>
            </ContainerBody>
          </Container>
        </WrapperRight>
      </Wrapper>
    </StyledIndex>
  )
}

const StyledIndex = styled.div``;
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
padding: 20px;
`;
const ContainerHeader = styled.div`
`;
const ContainerHeaderTitle = styled.h1`
color: white;
margin: 0;
`;
const ContainerBody = styled.div`
margin-top: 20px;
`;
const CardStats = styled.div`
display: grid;
grid-gap: 20px;

@media screen and (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}

@media screen and (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
}
`;