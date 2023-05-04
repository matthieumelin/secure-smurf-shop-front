import React from "react";

import styled from "styled-components";

import Colors from "../../utils/colors.util";

export default function ProductRegionCard({ data, onSelectProductRegion }) {
  return (
    <StyledProductRegionCard onClick={() => onSelectProductRegion(data)}>
      <ProductRegionCardImage
        src={`${process.env.PUBLIC_URL
          }/assets/images/servers/${data.shortName.toLowerCase()}.png`}
      />
      <ProductRegionCardInfos>
        <ProductRegionCardInfosName>{data.name}</ProductRegionCardInfosName>
        <ProductRegionCardInfosShortName>
          {data.short_name}
        </ProductRegionCardInfosShortName>
      </ProductRegionCardInfos>
    </StyledProductRegionCard>
  );
}

const StyledProductRegionCard = styled.div`
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
const ProductRegionCardImage = styled.img`
  display: block;
  max-width: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  opacity: 0.75;
  transition: 0.2s;
  ${StyledProductRegionCard}:hover & {
    transition: 0.2s;
    opacity: 1;
  }
`;
const ProductRegionCardInfos = styled.div`
  padding: 20px;
`;
const ProductRegionCardInfosName = styled.h3`
  color: white;
  margin: 0;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
`;
const ProductRegionCardInfosShortName = styled.p`
  color: ${Colors.primary};
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;
