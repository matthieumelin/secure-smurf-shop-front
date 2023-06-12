import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Footer from "../components/footer.component";
import Navbar from "../components/navbar.component";
import Button from "../components/utils/button.component";

import Colors from "../utils/colors.util";

import AppRoutes from "../router/app.routes";

export default function NotFound() {
  return (
    <StyledNotFound>
      <Helmet>
        <title>Error 404</title>
      </Helmet>
      <Navbar />
      <Main>
        <MainTitle>404</MainTitle>
        <MainDescription>
          The page you were looking for does not exist.
        </MainDescription>
        <MainLink to={AppRoutes.Home}>
          <Button
            bgColor={Colors.primary}
            title="Go back"
            align={"center"}
          />
        </MainLink>
      </Main>
      <Footer />
    </StyledNotFound>
  );
}

const StyledNotFound = styled.div`
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
  max-width: 768px;
  margin: 0 auto;

  @media screen and (min-width: 1024px) {
    padding: 100px;
  }
`;
const MainTitle = styled.h1`
  color: white;
  font-size: 7.5rem;
  margin: 0;
  text-align: center;
`;
const MainDescription = styled.p`
  margin: 0 0 30px 0;
  color: white;
  text-align: center;
  font-size: 1.875rem;
`;
const MainLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  margin: 0 auto;
  display: block;
`;
