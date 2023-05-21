import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

import ProductCategoryCard from "../../components/client-area/cards/product-category-card.component";
import Header from "../../components/client-area/header.component";
import Navbar from "../../components/client-area/navbar.component";
import Modal from "../../components/utils/modal.component";
import TableOrders from "../../components/client-area/table-orders.component";

import AppRoutes from "../../router/app.routes";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";

import Colors from "../../utils/colors.util";
import OrderAccountModal from "../../components/client-area/order-account-modal-component";

export default function ClientAreaIndex({ sidebarIsOpen, showLogoutModal, setSidebarIsOpen, setShowLogoutModal }) {
  // Redux
  const token = useSelector((state) => state.user.token);
  const userData = useSelector((state) => state.user.data);

  // States
  const [orders, setOrders] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});

  // Router
  const navigate = useNavigate();

  const userId = userData && userData.id;

  useEffect(() => {
    const fetchOrders = async () => {
      await axios
        .get(`${API_ENDPOINTS.USER_ORDERS}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (res) => {
          if (res.status === 200) {
            console.log(res.data)
            setOrders(res.data);
          }
        })
        .catch((err) => { if (err) console.error(err.response.data.message) });
    };

    if (token) fetchOrders();
  }, [token, userId]);

  const onConfirmLogout = () => {
    document.body.style.overflow = "initial";

    navigate(AppRoutes.Logout);

    setShowLogoutModal(false);
  }

  const onCancelLogout = () => {
    document.body.style.overflow = "initial";

    setShowLogoutModal(false);
  }

  const onView = (productItem) => {
    document.body.style.overflow = "hidden";

    setSelectedAccount(productItem);
  }

  const onCloseView = () => {
    document.body.style.overflow = "initial";

    setSelectedAccount({});
  }

  // const modifiedOrders = orders.reduce((acc, order) => {
  //   const { name } = order.product;
  //   const existingOrder = acc.find((o) => o.product.name === name && moment(o.createdAt).isSame(moment(order.createdAt), 'day'));

  //   if (existingOrder) {
  //     existingOrder.count++;
  //     existingOrder.productItems.push(order.productItem);
  //   } else {
  //     acc.push({ ...order, count: 1, productItems: [order.productItem] });
  //   }

  //   return acc;
  // }, []);

  if (!token) {
    return <Navigate to={AppRoutes.Login} />;
  }

  return (
    <StyledClientAreaIndex>
      <Helmet>
        <title>Dashboard</title>
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
            {selectedAccount && Object.keys(selectedAccount).length &&
              <OrderAccountModal
                selectedAccount={selectedAccount}
                onView={onView}
                onCloseView={onCloseView} />}
            <Container>
              <MainTitle>Welcome</MainTitle>
              <MainUsername>{userData.username}</MainUsername>
              <ProductCategories>
                <ProductCategoryCard
                  data={{
                    icon: "diamond.svg",
                    name: "Accounts And Smurfs",
                    link: AppRoutes.Home,
                  }}
                />
              </ProductCategories>
              <LatestOrders>
                <LatestOrdersHeader>
                  <LatestOrdersHeaderTitle>
                    Latest orders
                  </LatestOrdersHeaderTitle>
                  <LatestOrdersHeaderMore to={AppRoutes.Orders}>
                    See all
                  </LatestOrdersHeaderMore>
                </LatestOrdersHeader>
                {orders && orders.length ? (
                  <LatestOrdersContent>
                    <TableOrders
                      orders={orders}
                      orderPerPage={5}
                      onView={onView} />
                  </LatestOrdersContent>
                ) : (
                  <LatestOrdersContent>
                    <LatestOrdersMessage>
                      No orders.{" "}
                      <LatestOrdersLink to={AppRoutes.Home}>
                        Buy now
                      </LatestOrdersLink>
                    </LatestOrdersMessage>
                  </LatestOrdersContent>
                )}
              </LatestOrders>
            </Container>
          </MainContent>
        </Main>
      </Wrapper>
    </StyledClientAreaIndex>
  );
}

const StyledClientAreaIndex = styled.div``;
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
const MainTitle = styled.h3`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  margin: 0;
`;
const MainUsername = styled.h2`
  margin: 0;
  color: white;
`;
const Container = styled.div`
`;
const ProductCategories = styled.section`
  margin: 30px 0;

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LatestOrders = styled.section`
  margin: 30px 0 0 0;
`;
const LatestOrdersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LatestOrdersHeaderTitle = styled.h3`
  margin: 0;
  color: white;
`;
const LatestOrdersHeaderMore = styled(Link)`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s;
  text-decoration: none;

  &:hover {
    transition: 0.2s;
    color: ${Colors.primary};
  }
`;
const LatestOrdersContent = styled.div`
  background-color: ${Colors.primaryLowOp};
  padding: 20px 0;
  margin: 20px 0 0 0;
  border-radius: 10px;
`;
const LatestOrdersMessage = styled.p`
  color: white;
  margin: 0 0 0 20px;
`;
const LatestOrdersLink = styled(Link)`
  color: ${Colors.primary};
`;
