import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import styled from "styled-components";

import Colors from "../utils/colors.util";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.error(error.message);
    }
  };
  return (
    <StyledCheckoutForm onSubmit={onSubmit}>
      <CardElement />
      <CheckoutFormButton type="submit">Pay now</CheckoutFormButton>
    </StyledCheckoutForm>
  );
}

const StyledCheckoutForm = styled.form`
  max-width: 400px;
`;
const CheckoutFormButton = styled.button`
  color: ${Colors.primary};
  background-color: ${Colors.primaryLowOp};
  border-radius: 20px;
  border: none;
  font-family: inherit;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 11px 28px;
  width: max-content;
  display: block;
  transition: 0.2s;

  ${(props) => {
    if (props.disabled) {
      return `
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.3);
    `;
    } else {
      return `
    &:hover {
      cursor: pointer;
      transition: 0.2s;
      color: white;
      background-color: ${Colors.primary};
    }
    `;
    }
  }}
`;
