import React from "react";
import { Helmet } from "react-helmet-async";

import styled from "styled-components";

import IndexDom from "../dom/index.dom";

export default function Index({ stripePromise, showCheckoutModal, setShowCheckoutModal }) {
  return (
    <StyledIndex>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <IndexDom
        stripePromise={stripePromise}
        showCheckoutModal={showCheckoutModal}
        setShowCheckoutModal={setShowCheckoutModal} />
    </StyledIndex>
  );
}

const StyledIndex = styled.div``;
