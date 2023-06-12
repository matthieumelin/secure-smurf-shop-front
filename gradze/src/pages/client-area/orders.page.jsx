import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import styled from "styled-components";

import Header from "../../components/client-area/header.component";
import Navbar from "../../components/client-area/navbar.component";
import Modal from "../../components/utils/modal.component";
import TableOrders from "../../components/client-area/table-orders.component";

import Colors from "../../utils/colors.util";

import AppRoutes from "../../router/app.routes";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";

export default function Orders({ sidebarIsOpen, showLogoutModal, setSidebarIsOpen, setShowLogoutModal }) {
  // Redux
  const token = useSelector((state) => state.user.token);
  const userData = useSelector((state) => state.user.data);

  // States
  const [orders, setOrders] = useState([]);

  // Router
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      await axios
        .get(`${API_ENDPOINTS.USER_ORDERS}/${userData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => { if (res.status === 200) setOrders(res.data) })
        .catch((err) => { if (err) console.error(err.response.data.message) });
    };

    if (token) fetchOrders();
  }, [token, userData.id]);

  const onConfirmLogout = () => {
    document.body.style.overflow = "initial";

    navigate(AppRoutes.Logout);

    setShowLogoutModal(false);
  }

  const onCancelLogout = () => {
    document.body.style.overflow = "initial";
     
    setShowLogoutModal(false);
  }

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
          showLogoutModal={showLogoutModal}
          setSidebarIsOpen={setSidebarIsOpen}
          setShowLogoutModal={setShowLogoutModal}
        />
        <Main>
          <Navbar setSidebarIsOpen={setSidebarIsOpen} />
          <MainContent>
            <Modal
              title={"Logout"}
              description={"Are you sure you want to logout?"}
              active={showLogoutModal}
              onConfirm={onConfirmLogout}
              onCancel={onCancelLogout}
              buttonCancelTitle={"Cancel"}
              buttonConfirmTitle={"Logout"}
            />
            <Container>
              <ContainerOrders>
                <ContainerOrdersHeader>
                  <ContainerOrdersHeaderTitle>
                    Orders
                  </ContainerOrdersHeaderTitle>
                </ContainerOrdersHeader>
                {orders.length ? (
                  <ContainerOrdersContent>
                    <TableOrders
                      orders={orders}
                      orderPerPage={5}
                      onView={() => {

                      }} />
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