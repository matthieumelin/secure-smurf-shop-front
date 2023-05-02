import React from "react";

import styled from "styled-components";
import Colors from "../../utils/colors.util";

export default function ProductServerCard({ data, onSelectProductServer }) {
  return (
    <StyledProductServerCard onClick={() => onSelectProductServer(data)}>
      <ProductServerCardImage
        src={`${
          process.env.PUBLIC_URL
        }/assets/images/servers/${data.shortName.toLowerCase()}.png`}
      />
      <ProductServerCardInfos>
        <ProductServerCardInfosName>{data.name}</ProductServerCardInfosName>
        <ProductServerCardInfosShortName>
          {data.short_name}
        </ProductServerCardInfosShortName>
      </ProductServerCardInfos>
    </StyledProductServerCard>
  );
}

const StyledProductServerCard = styled.div`
  border-radius: 10px;
  background-color: black;
  cursor: pointer;
  box-shadow: 0 0 9px #0009;
  transition: 0.2s;
  width: max-content;
  border: 2px solid ${Colors.lightGray};

  &:hover {
    transition: 0.2s;
    box-shadow: 0 11px 43px ${Colors.primary}, 0 21px 23px ${Colors.primary},
      0 42px 108px ${Colors.primary};
    background: linear-gradient(90deg, black 0, ${Colors.gray});
    transform: translateY(-10px);
    border: 2px solid ${Colors.primary};
  }
`;
const ProductServerCardImage = styled.img`
  display: block;
  max-width: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  opacity: 0.75;
  transition: 0.2s;
  ${StyledProductServerCard}:hover & {
    transition: 0.2s;
    opacity: 1;
  }
`;
const ProductServerCardInfos = styled.div`
  padding: 20px;
`;
const ProductServerCardInfosName = styled.h3`
  color: white;
  margin: 0;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
`;
const ProductServerCardInfosShortName = styled.p`
  color: ${Colors.primary};
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;
