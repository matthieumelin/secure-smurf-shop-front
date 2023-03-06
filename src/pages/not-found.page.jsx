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
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundDescription>
          The page you were looking for does not exist.
        </NotFoundDescription>
        <NotFoundLink to={AppRoutes.Home}>
          <Button
            bgColor={Colors.primary}
            title="Go back"
            align={"center"}
            width={"100%"}
          />
        </NotFoundLink>
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
const NotFoundTitle = styled.h1`
  color: white;
  font-size: 7.5rem;
  margin: 0;
  text-align: center;
`;
const NotFoundDescription = styled.p`
  margin: 0 0 30px 0;
  color: white;
  text-align: center;
  font-size: 1.875rem;
`;
const NotFoundLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  margin: 0 auto;
  display: block;
`;
