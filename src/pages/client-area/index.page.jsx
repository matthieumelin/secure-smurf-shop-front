import React from "react";
import { Helmet } from "react-helmet-async";

import styled from "styled-components";

import ProductCategoryCard from "../../components/client-area/cards/product-category-card.component";
import Header from "../../components/client-area/header.component";
import Navbar from "../../components/client-area/navbar.component";

import Colors from "../../utils/colors.util";

export default function ClientAreaIndex({ sidebarIsOpen, setSidebarIsOpen }) {
  const orders = [
    {
      id: 1,
      product: "Basic",
      date: "2023-02-05",
    },
    {
      id: 2,
      product: "Starter",
      date: "2023-02-07",
    },
    {
      id: 3,
      product: "Prime",
      date: "2023-02-15",
    },
  ];
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
              <MainUsername>cQ2GMfWl</MainUsername>
              <ProductCategories>
                <ProductCategoryCard
                  data={{ icon: "diamond.svg", name: "Accounts And Smurfs" }}
                />
              </ProductCategories>
              <LatestOrders>
                <LatestOrdersHeader>
                  <LatestOrdersHeaderTitle>
                    Latest orders
                  </LatestOrdersHeaderTitle>
                  <LatestOrdersHeaderMore>See all</LatestOrdersHeaderMore>
                </LatestOrdersHeader>
                <LatestOrdersContent>
                  <LatestOrdersTable>
                    <LatestOrdersTableHeader>
                      <LatestOrdersTableHeaderRow>
                        ID
                      </LatestOrdersTableHeaderRow>
                      <LatestOrdersTableHeaderRow>
                        Name
                      </LatestOrdersTableHeaderRow>
                      <LatestOrdersTableHeaderRow>
                        Date
                      </LatestOrdersTableHeaderRow>
                    </LatestOrdersTableHeader>
                  </LatestOrdersTable>
                  {orders &&
                    orders.map((order) => {
                      return (
                        <LatestOrder key={`order_${order.id}`}>
                          <LatestOrderColumn>{order.id}</LatestOrderColumn>
                          <LatestOrderColumn>{order.product}</LatestOrderColumn>
                          <LatestOrderColumn>{order.date}</LatestOrderColumn>
                        </LatestOrder>
                      );
                    })}
                </LatestOrdersContent>
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
const LatestOrdersTable = styled.div``;
const LatestOrdersTableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LatestOrdersTableHeaderRow = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;
const LatestOrder = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LatestOrderColumn = styled.div`
  color: white;
`;
