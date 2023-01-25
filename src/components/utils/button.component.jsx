import React from "react";

import styled from "styled-components";

export const ButtonStyles = {
  outlined: {},
  filled: {},
};

export default function Button({
  type,
  title,
  bgColor,
  onClick,
  width,
  font,
  align,
  customStyles = ButtonStyles.filled,
}) {
  return (
    <StyledButton
      type={type}
      bgColor={bgColor}
      onClick={onClick}
      width={width}
      font={font}
      align={align}
      style={customStyles}
    >
      {title}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  color: white;
  border-radius: 20px;
  border: none;
  padding: 6px 20px;
  font-family: inherit;
  font-size: inherit;
  ${(props) =>
    props.align === "center"
      ? `
  display: block;
  margin: 0 auto;
  `
      : null};
  font-weight: ${(props) => props.font};
  width: ${(props) => props.width};
  background-color: ${(props) => props.bgColor};
  box-shadow: 10px 10px 60px rgb(0 0 0 / 7%);
`;
