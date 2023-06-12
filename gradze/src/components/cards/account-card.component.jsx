import React from "react";

import styled from "styled-components";

import Colors from "../../utils/colors.util";
import { kFormatter } from "../../utils/number.util";

export default function AccountCard({ data, loading, onClick }) {
  return (
    <StyledAccountCard>
      <AccountCardHeader>
        <AccountCardHeaderTitle>{data.name}</AccountCardHeaderTitle>
        <AccountCardHeaderPrice>
          <AccountCardHeaderPriceSpan>€</AccountCardHeaderPriceSpan>
          {data.price.toFixed(2)}
        </AccountCardHeaderPrice>
      </AccountCardHeader>
      <AccountCardBody>
        <AccountCardBodyFeatures>
          <AccountCardBodyFeaturesItem>
            <AccountCardBodyFeaturesItemIcon>
              <AccountCardBodyFeaturesItemIconImage
                src={`${process.env.PUBLIC_URL}/assets/icons/done.svg`}
                alt="Feature"
              />
            </AccountCardBodyFeaturesItemIcon>
            <AccountCardBodyFeaturesItemStrong>{kFormatter(data.blueEssence)}</AccountCardBodyFeaturesItemStrong>Blue Essence
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            <AccountCardBodyFeaturesItemIcon>
              <AccountCardBodyFeaturesItemIconImage
                src={`${process.env.PUBLIC_URL}/assets/icons/done.svg`}
                alt="Feature"
              />
            </AccountCardBodyFeaturesItemIcon>
            Level ~{data.level}
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            <AccountCardBodyFeaturesItemIcon>
              <AccountCardBodyFeaturesItemIconImage
                src={`${process.env.PUBLIC_URL}/assets/icons/done.svg`}
                alt="Feature"
              />
            </AccountCardBodyFeaturesItemIcon>
            Ranked Ready
          </AccountCardBodyFeaturesItem>
          <AccountCardBodyFeaturesItem>
            <AccountCardBodyFeaturesItemIcon>
              <AccountCardBodyFeaturesItemIconImage
                src={`${process.env.PUBLIC_URL}/assets/icons/done.svg`}
                alt="Feature"
              />
            </AccountCardBodyFeaturesItemIcon>
            Life-time Warranty
          </AccountCardBodyFeaturesItem>
        </AccountCardBodyFeatures>
        {!data.stock ? (
          <AccountCardBuyButton type="submit" disabled={!data.stock}>
            Out of stock
          </AccountCardBuyButton>
        ) : (
          <AccountCardBuyWrapper>
            <AccountCardBuyButton
              type="submit"
              onClick={onClick}
              disabled={!data.stock || loading}
            >
              {loading ? "Processing..." : "Buy now"}
            </AccountCardBuyButton>
            {data.stock <= 10 ? (
              <AccountCardBuyLimitedStock>
                <AccountCardBuyLimitedStockIcon
                  src={`${process.env.PUBLIC_URL}/assets/icons/limited-stock.webp`}
                  alt="Limited stock"
                />
                Only {data.stock} left!
              </AccountCardBuyLimitedStock>
            ) : null}
          </AccountCardBuyWrapper>
        )}
      </AccountCardBody>
    </StyledAccountCard>
  );
}

const StyledAccountCard = styled.article`
  background-color: ${Colors.gray};
  border-radius: 10px;
  box-shadow: 0px 0px 60px rgb(0 0 0 / 7%);
  border: 1px solid ${Colors.primary};
  transition: 0.2s;
cursor: pointer;
width: 100%;

    &:hover {
    transition: 0.2s;
    box-shadow: 0 0px 43px ${Colors.primaryLowOp}, 0 0px 23px ${Colors.primaryLowOp},
      0 0px 108px ${Colors.primaryLowOp};
    background: linear-gradient(90deg, black 0, ${Colors.gray});
    transform: translateY(-5px);
  }
`;
const AccountCardHeader = styled.div`
  position: relative;
  padding: 20px 0 0 0;
`;
const AccountCardHeaderPrice = styled.h1`
  margin: 0;
  color: white;
  font-size: 2.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
`;
const AccountCardHeaderPriceSpan = styled.span`
  font-size: 1rem;
  width: max-content;
`;

const AccountCardHeaderTitle = styled.h4`
  margin: 0;
  color: white;
  text-align: center;
`;
const AccountCardBody = styled.div`
  padding: 0 20px 20px 20px;
`;
const AccountCardBodyFeatures = styled.ul`
  list-style: none;
  padding: 0;
`;
const AccountCardBodyFeaturesItem = styled.li`
  color: white;
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;
`;
const AccountCardBodyFeaturesItemStrong = styled.p`
font-weight: 700;
margin: 0 5px 0 0;
`;
const AccountCardBodyFeaturesItemIcon = styled.div`
  border-radius: 100px;
  width: 22px;
  height: 22px;
  background-color: ${Colors.primaryLowOp};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px 0 0;
`;
const AccountCardBodyFeaturesItemIconImage = styled.img`
  width: 14px;
  height: 14px;
  display: block;
`;
const AccountCardBuyWrapper = styled.div``;
const AccountCardBuyButton = styled.button`
  background-color: ${Colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: inherit;
  font-family: inherit;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }

  ${(props) => {
    if (props.disabled) {
      return `
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    `;
    }
  }}
`;
const AccountCardBuyLimitedStock = styled.div`
  display: flex;
  justify-content: center;
  color: ${Colors.red};
  margin: 20px 0 0 0;
`;
const AccountCardBuyLimitedStockIcon = styled.img`
  display: block;
  width: 22px;
  height: 22px;
  margin: 0 5px 0 0;
`;
