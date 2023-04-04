import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";
import Navbar from "../../components/navbar.component";

import Colors from "../../utils/colors.util";

import AppRoutes from "../../router/app.routes";

export default function CheckoutComplete({ type }) {
  const token = useSelector((state) => state.user.token);

  if (!token) {
    return <Navigate to={AppRoutes.Login} />;
  }

  return (
    <StyledCheckoutComplete>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <Navbar />
      <Main>
        {type.includes("fail") ? (
          <Container>
            <ContainerImage
              src={`${process.env.PUBLIC_URL}/assets/icons/error.svg`}
              alt="Error"
            />
            <ContainerTitle>Oops, something went wrong</ContainerTitle>
            <ContainerDescription>
              Please check if the details provided during the transaction are
              correct. If all of the details were provided correctly, please
              contact the bank that issued your card in order to investigate the
              cause of the rejection or use an other payment option.
            </ContainerDescription>
            <ContainerLink to={AppRoutes.Home}>Return to home</ContainerLink>
          </Container>
        ) : (
          <Container>
            <ContainerTitle>Thank you for your purchase!</ContainerTitle>
            <ContainerDescription>
              You will receive a confirmation email with order details.
            </ContainerDescription>
            <ContainerImage
              src={`${process.env.PUBLIC_URL}/assets/icons/checkmark.gif`}
              alt="Success"
            />
            <ContainerLink to={AppRoutes.ClientArea} customStyle={"gradient"}>
              Client Area
            </ContainerLink>
            <ContainerLink to={AppRoutes.Home}>Return to home</ContainerLink>
          </Container>
        )}
      </Main>
    </StyledCheckoutComplete>
  );
}

const StyledCheckoutComplete = styled.div``;
const Main = styled.main`
  margin: 30px auto;
  padding: 0 30px;
  max-width: 1024px;
`;
const Container = styled.div`
  background-color: ${Colors.primaryLowOp};
  padding: 30px;
  border-radius: 20px;
`;
const ContainerImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
`;
const ContainerTitle = styled.h1`
  color: white;
  text-align: center;
`;
const ContainerDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
`;
const ContainerLink = styled(Link)`
  ${(props) => {
    if (props.customStyle === "gradient") {
      return `
    background-image: linear-gradient(
      147.16deg,
      #5a189a 13.82%,
      #7b2cbf 35.53%,
      #9d4edd 76.05%
    );
    color: white;
    text-decoration: none;
    text-align: center;
    padding: 10px 20px;
    border-radius: 20px;
    font-family: inherit;
    font-weight: 600;
    `;
    } else {
      return `
      color: ${Colors.primary};
      background-color: ${Colors.primaryLowOp};
      border-radius: 20px;
      font-family: inherit;
      font-weight: 600;
      padding: 11px 28px;
      transition: 0.2s;
    
      &:hover {
        cursor: pointer;
        transition: 0.2s;
        color: white;
        background-color: ${Colors.primary};
      }
      `;
    }
  }}
  border: none;
  width: 100%;
  display: block;
  margin: 20px auto 0 auto;
  text-align: center;
  text-decoration: none;

  @media screen and (min-width: 1024px) {
    width: 425px;
  }
`;
