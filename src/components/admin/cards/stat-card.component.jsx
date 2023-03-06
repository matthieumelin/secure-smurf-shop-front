import React from "react";

import styled from "styled-components";
import Colors from "../../../utils/colors.util";

export default function AdminStatCard({ data }) {
  return (
    <StyledAdminStatCard>
      <AdminStatCardInfos>
        <AdminStatCardInfosValue>{data.value}</AdminStatCardInfosValue>
        <AdminStatCardInfosTitle>{data.title}</AdminStatCardInfosTitle>
      </AdminStatCardInfos>
      <AdminStatCardIcon>
        <AdminStatCardIconImage
          src={`${process.env.PUBLIC_URL}/assets/icons/${data.icon}`}
          alt={data.title}
        />
      </AdminStatCardIcon>
    </StyledAdminStatCard>
  );
}

const StyledAdminStatCard = styled.div`
  background-color: #060708;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
`;
const AdminStatCardIcon = styled.div`
  background-color: ${Colors.primaryHighOp};
  padding: 10px;
  border-radius: 100px;
`;
const AdminStatCardIconImage = styled.img`
  display: block;
  width: 22px;
  height: 22px;
  filter: invert(36%) sepia(100%) saturate(823%) hue-rotate(242deg)
    brightness(89%) contrast(94%);
`;
const AdminStatCardInfos = styled.div``;
const AdminStatCardInfosValue = styled.h2`
  margin: 0;
  color: white;
  font-weight: 400;
`;
const AdminStatCardInfosTitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;
