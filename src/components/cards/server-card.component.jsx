import React from "react";

import styled from "styled-components";
import Colors from "../../utils/colors.util";

export default function ServerCard({ data, selectServer }) {
  return (
    <StyledServerCard onClick={() => selectServer(data)}>
      <ServerCardImage src={`${process.env.PUBLIC_URL}/assets/images/servers/${data.shortName}.png`} />
      <ServerCardInfos>
        <ServerCardInfosName>{data.name}</ServerCardInfosName>
        <ServerCardInfosShortName>{data.short_name}</ServerCardInfosShortName>
      </ServerCardInfos>
    </StyledServerCard>
  );
}

const StyledServerCard = styled.div`
  border-radius: 10px;
  background-color: black;
  cursor: pointer;
  box-shadow: 0 0 9px #0009;
  transition: 0.2s;
  width: max-content;
  border: 2px solid ${Colors.lightGray};

  &:hover {
    transition: 0.2s;
    box-shadow: 0 11px 43px ${Colors.primary}, 0 21px 23px ${Colors.primary}, 0 42px 108px ${Colors.primary};
    background: linear-gradient(90deg, black 0, ${Colors.gray});
    transform: translateY(-10px);
    border: 2px solid ${Colors.primary};
  }
`;
const ServerCardImage = styled.img`
  display: block;
  max-width: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  opacity: .75;
  transition: 0.2s;
  ${StyledServerCard}:hover & {
    transition: 0.2s;
    opacity: 1;
  }
`;
const ServerCardInfos = styled.div`
  padding: 20px;
`;
const ServerCardInfosName = styled.h3`
  color: white;
  margin: 0;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
`;
const ServerCardInfosShortName = styled.p`
  color: ${Colors.primary};
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;
