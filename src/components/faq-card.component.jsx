import React, { useState } from "react";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function FaqCard({ data }) {
  const [isToggled, setToggled] = useState(false);

  return (
    <StyledFaq onClick={() => setToggled(!isToggled)}>
      <FaqHeader>
        <FaqHeaderQuestion>{data.question}</FaqHeaderQuestion>
        <FaqHeaderToggle icon={faArrowUp} />
      </FaqHeader>
      {isToggled ? (
        <FaqBody>
          <FaqBodyAnswer>{data.answer}</FaqBodyAnswer>
        </FaqBody>
      ) : null}
    </StyledFaq>
  );
}

const StyledFaq = styled.div``;
const FaqHeader = styled.div``;
const FaqHeaderQuestion = styled.h2``;
const FaqHeaderToggle = styled(FontAwesomeIcon)``;
const FaqBody = styled.div``;
const FaqBodyAnswer = styled.p``;
