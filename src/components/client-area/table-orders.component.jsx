import React from 'react'

import styled from 'styled-components'

import moment from 'moment/moment';

import Colors from '../../utils/colors.util';

export default function TableOrders({ orders, orderPerPage = 5, onView }) {
  const sortedOrders = orders.sort((a, b) => b.createdAt - a.createdAt);
  const slicedOrders = sortedOrders.slice(0, orderPerPage);

  return (
    <StyledTable>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">ID</TableHead>
          <TableHead scope="col">Item</TableHead>
          <TableHead scope="col">Status</TableHead>
          <TableHead scope="col">Date</TableHead>
          <TableHead scope="col">Account</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {slicedOrders && slicedOrders.map((order, index) => {
          const orderCount = order.count;
          const orderProductName = order.product.name;

          return <TableRow key={`order_${index}`}>
            <TableData data-label="ID">{order.id}</TableData>
            <TableData data-label="Item">
              <TableDataWrapper>
                <TableDataWrapperIcon src={`${process.env.PUBLIC_URL}/assets/icons/lol.png`} alt="Account" />
                <TableDataWrapperValue>{orderCount > 1 ? `${orderProductName} x${orderCount}` : orderProductName}</TableDataWrapperValue>
              </TableDataWrapper>
            </TableData>
            <TableData data-label="Status">{order.status}</TableData>
            <TableData data-label="Date">{moment(order.createdAt).format("L")}</TableData>
            <TableData data-label="Account">
              <TableDataButton type="button" onClick={() => onView(order.productItem)}>View</TableDataButton>
            </TableData>
          </TableRow>
        })}
      </TableBody>
    </StyledTable>
  )
}

const StyledTable = styled.table`
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

  @media screen and (max-width: 600px) {
    display: block;
  }
`;
const TableHead = styled.th`
  text-align: center;
  font-size: 0.85em;
  text-transform: uppercase;
  color: white;
`;
const TableBody = styled.tbody``;
const TableData = styled.td`
  text-align: center;
  color: white;

  @media screen and (max-width: 600px) {
    border-bottom: 1px solid ${Colors.primary};
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
const TableDataWrapper = styled.div`
display: flex;
align-items: center;
justify-content: end;

@media screen and (min-width: 600px) {
  justify-content: center;
}
`;
const TableDataWrapperIcon = styled.img`
display: block;
width: 32px;
height: 32px;
margin-right: 10px;
`;
const TableDataWrapperValue = styled.p`
padding: 0;
`;
const TableDataButton = styled.button`
background-color: ${Colors.primary};
color: white;
font-size: inherit;
font-family: inherit;
border: none;
border-radius: 2px;
transition: 0.2s;
cursor: pointer;

&:hover {
  transition: 0.2s;
  -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
}
`;