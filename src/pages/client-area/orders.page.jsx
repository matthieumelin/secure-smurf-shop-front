import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import styled from "styled-components";

import ProductCategoryCard from "../../components/client-area/cards/product-category-card.component";
import Header from "../../components/client-area/header.component";
import Navbar from "../../components/client-area/navbar.component";

import Colors from "../../utils/colors.util";

import AppRoutes from "../../router/app.routes";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";

export default function Orders({ sidebarIsOpen, setSidebarIsOpen }) {
  const [orders, setOrders] = useState([]);

  const token = useSelector((state) => state.user.token);
  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchOrders = async () => {
      await axios
        .get(`${API_ENDPOINTS.USER_ORDERS}/${userData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err.response.data.message));
    };

    fetchOrders();
  }, [token, userData.id]);

  if (!token) {
    return <Navigate to={AppRoutes.Login} />;
  }

  return (
    <StyledOrders>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <Wrapper>
        <Header
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
        />
        <Main>
          <Navbar setSidebarIsOpen={setSidebarIsOpen} />
          <MainContent>
            <Container>
              <ContainerOrders>
                <ContainerOrdersHeader>
                  <ContainerOrdersHeaderTitle>
                    Orders
                  </ContainerOrdersHeaderTitle>
                </ContainerOrdersHeader>
                {orders.length ? (
                  <ContainerOrdersContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead scope="col">Item</TableHead>
                          <TableHead scope="col">ID</TableHead>
                          <TableHead scope="col">Price</TableHead>
                          <TableHead scope="col">Status</TableHead>
                          <TableHead scope="col">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order, index) => {
                          console.log(order);
                          return (
                            <TableRow key={`order_${index}`}>
                              <TableData data-label="Item">X</TableData>
                              <TableData data-label="ID">{order.id}</TableData>
                              <TableData data-label="Price">
                                {order.totalPrice}
                              </TableData>
                              <TableData data-label="Status">
                                Unpaid placeholder
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
                  </ContainerOrdersContent>
                ) : (
                  <ContainerOrdersContent>
                    <ContainerOrdersMessage>
                      No orders.{" "}
                      <ContainerOrdersLink to={AppRoutes.Home}>
                        Buy now
                      </ContainerOrdersLink>
                    </ContainerOrdersMessage>
                  </ContainerOrdersContent>
                )}
              </ContainerOrders>
            </Container>
          </MainContent>
        </Main>
      </Wrapper>
    </StyledOrders>
  );
}

const StyledOrders = styled.div``;
const Wrapper = styled.div``;
const Main = styled.main``;
const MainContent = styled.div`
  padding: 15px;

  @media screen and (min-width: 1024px) {
    width: 80%;
    margin: 0 auto;
    padding: 30px;
  }
`;
const Container = styled.div`
  @media screen and (min-width: 1024px) {
    width: 50%;
  }
`;

const ContainerOrders = styled.section`
  margin: 30px 0 0 0;
`;
const ContainerOrdersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ContainerOrdersHeaderTitle = styled.h2`
  margin: 0;
  color: white;
`;
const ContainerOrdersContent = styled.div`
  background-color: ${Colors.primaryLowOp};
  padding: 20px;
  margin: 20px 0 0 0;
  border-radius: 10px;
`;
const ContainerOrdersMessage = styled.p`
  color: white;
  margin: 0;
`;
const ContainerOrdersLink = styled(Link)`
  color: ${Colors.primary};
`;

const Table = styled.table`
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
const TableDataBadge = styled.div``;
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
