import React from "react";

import styled from "styled-components";
import Colors from "../../../utils/colors.util";

export default function ProductCategoryCard({ data }) {
  return (
    <StyledProductCategoryCard>
      <ProductCategoryCardIcon
        src={`${process.env.PUBLIC_URL}/assets/icons/${data.icon}`}
        alt={data.name}
      />
      <ProductCategoryCardName>{data.name}</ProductCategoryCardName>
    </StyledProductCategoryCard>
  );
}

const StyledProductCategoryCard = styled.div`
  background-color: ${Colors.primaryLowOp};
  padding: 2.5rem;
  border-radius: 10px;
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
