import React from "react";
import { Helmet } from "react-helmet-async";

import styled from "styled-components";

import IndexDOM from "../dom/index.dom";

export default function Index({ stripePromise }) {
  return (
    <StyledIndex>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <IndexDOM stripePromise={stripePromise} />
    </StyledIndex>
  );
}

const StyledIndex = styled.div``;
