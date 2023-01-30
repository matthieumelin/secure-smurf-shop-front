import React from "react";

import styled from "styled-components";
import Colors from "../../utils/colors.util";

export default function ServerCard({ data, selectServer }) {
  return (
    <StyledServerCard onClick={() => selectServer(data)}>
      <ServerCardImage src={`${process.env.PUBLIC_URL}/images/${data.image}`} />
      <ServerCardInfos>
        <ServerCardInfosName>{data.name}</ServerCardInfosName>
        <ServerCardInfosShortName>{data.short_name}</ServerCardInfosShortName>
      </ServerCardInfos>
    </StyledServerCard>
  );
}

const StyledServerCard = styled.div`
  border-radius: 10px;
  background-color: ${Colors.lightGray};
  cursor: pointer;
`;
const ServerCardImage = styled.img`
  display: block;
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;
const ServerCardInfos = styled.div`
  padding: 20px;
`;
const ServerCardInfosName = styled.h3`
  color: white;
  margin: 0;
`;
const ServerCardInfosShortName = styled.p`
  color: ${Colors.primary};
  margin: 0;
`;
