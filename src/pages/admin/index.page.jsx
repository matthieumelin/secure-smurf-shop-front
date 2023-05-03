import React from 'react'
import { Helmet } from 'react-helmet-async';

import styled from 'styled-components'

import CardStat from '../../components/admin/cards/card-stat.component';
import Navbar from '../../components/admin/navbar.component';
import Sidebar from '../../components/admin/sidebar.component';

export default function AdminIndex() {
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
          <Navbar title={`Welcome GeekLegend`} />
          <CardStats>
            <CardStat data={{ color: "#edc531", title: "Users", value: 621 }} />
            <CardStat data={{ color: "#a70b0b", title: "Orders", value: 50 }} />
            <CardStat data={{ title: "Products", value: 5 }} />
          </CardStats>
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
const CardStats = styled.div`
display: grid;
grid-gap: 20px;
padding: 20px;

@media screen and (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}

@media screen and (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
}
`;