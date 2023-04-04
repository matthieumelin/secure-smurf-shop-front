import moment from "moment";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

import styled from "styled-components";

import ProductCategoryCard from "../../components/client-area/cards/product-category-card.component";
import Header from "../../components/client-area/header.component";
import Navbar from "../../components/client-area/navbar.component";

import Colors from "../../utils/colors.util";

import AppRoutes from "../../router/app.routes";

export default function ClientAreaIndex({ sidebarIsOpen, setSidebarIsOpen }) {
  const token = useSelector((state) => state.user.token);
  const data = useSelector((state) => state.user.data);

  // static
  const orders = [
    {
      id: 1,
      product: "Basic",
      date: new Date(Date.now()),
    },
    {
      id: 2,
      product: "Starter",
      date: new Date(Date.now()),
    },
    {
      id: 3,
      product: "Prime",
      date: new Date(Date.now()),
    },
  ];

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
          setSidebarIsOpen={setSidebarIsOpen}
        />
        <Main>
          <Navbar setSidebarIsOpen={setSidebarIsOpen} />
          <MainContent>
            <Container>
              <MainTitle>Welcome</MainTitle>
              <MainUsername>{data.username}</MainUsername>
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
                  <LatestOrdersHeaderMore>See all</LatestOrdersHeaderMore>
                </LatestOrdersHeader>
                {orders.length ? (
                  <LatestOrdersContent>
                    <LatestOrdersTable>
                      <LatestOrdersTableColumn>
                        <LatestOrdersTableColumnTitle>
                          ID
                        </LatestOrdersTableColumnTitle>
                        <LatestOrdersTableColumnDatas>
                          {orders.map((order) => {
                            return (
                              <LatestOrdersTableColumnData
                                key={`order_id_${order.id}`}
                              >
                                {order.id}
                              </LatestOrdersTableColumnData>
                            );
                          })}
                        </LatestOrdersTableColumnDatas>
                      </LatestOrdersTableColumn>
                      <LatestOrdersTableColumn>
                        <LatestOrdersTableColumnTitle>
                          Product
                        </LatestOrdersTableColumnTitle>
                        <LatestOrdersTableColumnDatas>
                          {orders.map((order) => {
                            return (
                              <LatestOrdersTableColumnData
                                key={`order_name_${order.id}`}
                              >
                                {order.product}
                              </LatestOrdersTableColumnData>
                            );
                          })}
                        </LatestOrdersTableColumnDatas>
                      </LatestOrdersTableColumn>
                      <LatestOrdersTableColumn>
                        <LatestOrdersTableColumnTitle>
                          Date
                        </LatestOrdersTableColumnTitle>
                        <LatestOrdersTableColumnDatas>
                          {orders.map((order) => {
                            return (
                              <LatestOrdersTableColumnData
                                key={`order_date_${order.id}`}
                              >
                                {moment(order.date).format("ll")}
                              </LatestOrdersTableColumnData>
                            );
                          })}
                        </LatestOrdersTableColumnDatas>
                      </LatestOrdersTableColumn>
                    </LatestOrdersTable>
                  </LatestOrdersContent>
                ) : (
                  <LatestOrdersContent>
                    <LatestOrdersMessage>
                      No data to display
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
  @media screen and (min-width: 1024px) {
    width: 50%;
  }
`;
const ProductCategories = styled.section`
  margin: 30px 0;
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
const LatestOrdersHeaderMore = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;
const LatestOrdersContent = styled.div`
  background-color: ${Colors.primaryLowOp};
  padding: 20px;
  margin: 20px 0 0 0;
  border-radius: 10px;
`;
const LatestOrdersTable = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const LatestOrdersTableColumnTitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;
const LatestOrdersTableColumn = styled.div`
  margin: 0 0 10px 0;

  &:last-child {
    margin: 0;
  }

  @media screen and (min-width: 1024px) {
    margin: 0;
  }
`;
const LatestOrdersTableColumnDatas = styled.div``;
const LatestOrdersTableColumnData = styled.div`
  color: white;
`;
const LatestOrdersMessage = styled.p`
  color: white;
  margin: 0;
`;
