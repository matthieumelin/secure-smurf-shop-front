import React from "react";
import { Helmet } from "react-helmet-async";

import styled from "styled-components";
import AdminStatCard from "../../components/admin/cards/stat-card.component";

import AdminNavbar from "../../components/admin/navbar.component";
import AdminSidebar from "../../components/admin/sidebar.component";

export default function AdminIndex() {
  return (
    <StyledAdminIndex>
      <Helmet>
        <title>Admin dashboard</title>
      </Helmet>
      <Wrapper>
        <AdminSidebar />
        <Main>
          <AdminNavbar />
          <MainHeader>
            <MainHeaderTitle>Dashboard</MainHeaderTitle>
            <MainHeaderDescription>Welcome GeekLegend!</MainHeaderDescription>
          </MainHeader>
          <MainBody>
            <Section>
              <AdminStatCard
                data={{
                  icon: "home.svg",
                  title: "Users",
                  value: 100,
                }}
              />
            </Section>
          </MainBody>
        </Main>
      </Wrapper>
    </StyledAdminIndex>
  );
}

const StyledAdminIndex = styled.div``;
const Wrapper = styled.div`
  display: flex;
`;
const Main = styled.main`
  width: 100%;
`;
const MainHeader = styled.div`
  padding: 20px;
`;
const MainHeaderTitle = styled.h1`
  margin: 0;
  color: white;
`;
const MainHeaderDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;
const MainBody = styled.div`
  padding: 0 30px;
`;
const Section = styled.section`
  margin: 30px 0;
`;
