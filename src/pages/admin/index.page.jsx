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
const Wrapper = styled.div``;
const WrapperLeft = styled.div``;
const WrapperRight = styled.div``;
const CardStats = styled.div`
display: grid;
grid-gap: 20px;
max-width: 90%;
margin: 0 auto;
`;