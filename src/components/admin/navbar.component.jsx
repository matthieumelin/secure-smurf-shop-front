import React from "react";

import styled from "styled-components";

import Gravatar from "react-gravatar";
import Colors from "../../utils/colors.util";

export default function AdminNavbar() {
  return (
    <StyledAdminNavbar>
      <AdminNavbarProfile>
        <AdminNavbarProfileAvatar
          email={"geeklegendofficiel@gmail.com"}
          size={40}
        />
        <AdminNavbarProfileUsername>GeekLegend</AdminNavbarProfileUsername>
      </AdminNavbarProfile>
    </StyledAdminNavbar>
  );
}

const StyledAdminNavbar = styled.nav`
  background-color: ${Colors.primary};
  padding: 10px 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
`;
const AdminNavbarProfile = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  align-items: center;
  gap: 10px;
`;
const AdminNavbarProfileUsername = styled.p`
  margin: 0;
  color: white;
`;
const AdminNavbarProfileAvatar = styled(Gravatar)`
  display: block;
  border-radius: 100px;
`;
