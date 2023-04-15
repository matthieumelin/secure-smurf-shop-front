import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";

import styled from "styled-components";

import Footer from "../components/footer.component";
import Navbar from "../components/navbar.component";
import Button from "../components/utils/button.component";

import Colors from "../utils/colors.util";

import AppRoutes from "../router/app.routes";

export default function CheckoutComplete() {
  const { type } = useParams();

  if (!type) {
    return <Navigate to={AppRoutes.Home} />;
  }

  return (
    <StyledCheckoutComplete>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <Navbar />
      <Main>
        <MainIcon
          src={`${process.env.PUBLIC_URL}/assets/icons/${
            type.includes("success") ? "checkmark.gif" : "error.svg"
          }`}
          alt={`${
            type.includes("success") ? "Payment Successful" : "Payment Declined"
          }`}
        />
        <MainTitle>
          {type.includes("success") ? "Payment Successful" : "Payment Declined"}
        </MainTitle>
        <MainDescription>
          {type.includes("success")
            ? "Your payment was successful! You can now continue to dashboard."
            : "The transaction was declined due to insufficient funds in your account. Please use a different card or contact your bank."}
        </MainDescription>
        <MainLink to={AppRoutes.ClientArea}>Go to Client Area!</MainLink>
      </Main>
      <Footer />
    </StyledCheckoutComplete>
  );
}

const StyledCheckoutComplete = styled.div`
  background-image: linear-gradient(
      to bottom,
      ${Colors.primaryHighOp},
      ${Colors.primaryHighOp}
    ),
    url("${process.env.PUBLIC_URL}/assets/images/not_found.webp");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Main = styled.main`
  padding: 30px;
  margin: 0 auto;

  @media screen and (min-width: 1024px) {
    padding: 100px;
  }
`;
const MainIcon = styled.img`
  max-width: 100%;
  display: block;
  margin: 0 auto;
`;
const MainTitle = styled.h1`
  color: white;
  margin: 0;
  text-align: center;
`;
const MainDescription = styled.p`
  margin: 0 0 30px 0;
  color: white;
  text-align: center;
`;
const MainLink = styled(Link)`
  color: white;
  background-color: ${Colors.primary};
  border-radius: 20px;
  border: none;
  font-family: inherit;
  font-weight: 600;
  padding: 10px 15px;
  cursor: pointer;
  transition: 0.2s;
  text-decoration: none;
  margin: 0 auto;
  display: block;
  width: max-content;

  &:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;
