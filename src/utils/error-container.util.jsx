import React from "react";

import styled from "styled-components";
import Colors from "./colors.util";

export default function ErrorContainer({ children }) {
  return <StyledErrorContainer>{children}</StyledErrorContainer>;
}

const StyledErrorContainer = styled.p`
color: ${Colors.red};
`;