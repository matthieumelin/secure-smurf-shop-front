import React from "react";

import styled from "styled-components";

export default function Button({ type, title, bgColor, onClick }) {
  return (
    <StyledButton type={type} bgColor={bgColor} onClick={onClick}>
      {title}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  color: white;
  background-color: ${(props) => props.bgColor};
`;
