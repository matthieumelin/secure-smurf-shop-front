import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Colors from "../../../utils/colors.util";

export default function ProductCategoryCard({ data }) {
  return (
    <StyledProductCategoryCard to={data.link}>
      <ProductCategoryCardIcon
        src={`${process.env.PUBLIC_URL}/assets/icons/${data.icon}`}
        alt={data.name}
      />
      <ProductCategoryCardName>{data.name}</ProductCategoryCardName>
    </StyledProductCategoryCard>
  );
}

const StyledProductCategoryCard = styled(Link)`
  background-color: ${Colors.primaryLowOp};
  padding: 2.5rem;
  border: 2px solid transparent;
  border-radius: 10px;
  text-decoration: none;
  display: block;
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    border: 2px solid ${Colors.primary};
  }
`;
const ProductCategoryCardIcon = styled.img`
  display: block;
  margin: 0 auto;
`;
const ProductCategoryCardName = styled.h4`
  font-weight: normal;
  color: white;
  margin: 10px 0 0 0;
  text-align: center;
`;
