import React from "react";

import styled from "styled-components";
import Colors from "../../utils/colors.util";

export default function CheckoutPaymentCard({ data, active, setPayment }) {
  return (
    <StyledCheckoutPaymentCard active={active} onClick={() => setPayment(data)}>
      <CheckoutPaymentCardSelector active={active} />
      <CheckoutPaymentCardImage
        src={`${process.env.PUBLIC_URL}/assets/images/payments/${data.image}`}
        alt={data.name}
      />
    </StyledCheckoutPaymentCard>
  );
}

const StyledCheckoutPaymentCard = styled.div`
  background-color: ${Colors.primaryLowOp};
  border: 2px solid
    ${(props) => (props.active ? Colors.primary : "transparent")};
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    border: 2px solid ${Colors.primary};
  }
`;
const CheckoutPaymentCardSelector = styled.div`
  background-color: transparent;
  border: 2px solid
    ${(props) => (props.active ? Colors.primary : "rgba(255,255,255,.2)")};
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  top: 10px;
  border-radius: 100px;

  ${(props) => {
    if (props.active) {
      return `
      &::after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: ${Colors.primary};
        border-radius: 100px;
      }
      `;
    }
  }}
`;
const CheckoutPaymentCardImage = styled.img`
  display: block;
`;
