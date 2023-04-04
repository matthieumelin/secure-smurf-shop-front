import React from "react";
import { Helmet } from "react-helmet-async";

import styled from "styled-components";

import IndexDOM from "../dom/index.dom";

export default function Index() {
  return (
    <StyledIndex>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <IndexDOM />
    </StyledIndex>
  );
}

const StyledIndex = styled.div``;
