import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styled from "styled-components";

import ButtonStyles from "../../utils/button-styles.util";
import Colors from "../../utils/colors.util";

export default function Button({
  type,
  icon,
  title,
  bgColor,
  onClick,
  width,
  font,
  align,
  theme = ButtonStyles.filled,
}) {
  return (
    <StyledButton
      type={type}
      bgColor={bgColor}
      onClick={onClick}
      width={width}
      font={font}
      align={align}
      style={theme}
    >
      {icon ? <ButtonIcon icon={icon} /> : null} {title}
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
  transition: 0.2s;

  &:hover {
    transition: 0.2s;
    background-color: ${Colors.primary} !important;
    color: white !important;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;
const ButtonIcon = styled(FontAwesomeIcon)`
  color: white;
  margin: 0 5px 0 0;
`;
