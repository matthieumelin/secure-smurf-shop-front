import React from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components'

import Colors from '../../../utils/colors.util';
import { capitalizeFirstLetter } from "../../../utils/string.util";

import AppRoutes from '../../../router/app.routes';

export default function UserPermissionCard({ data }) {
    return (
        <StyledUserPermissionCard>
            <UserPermissionCardLeft>
                <UserPermissionCardLeftName>{capitalizeFirstLetter(data.name)}</UserPermissionCardLeftName>
                {data.default && <UserPermissionCardLeftBadge type="default">Default</UserPermissionCardLeftBadge>}
            </UserPermissionCardLeft>
            <UserPermissionCardActions>
                <UserPermissionCardActionsEdit to={`${AppRoutes.AdminUsersPermissionsEdit}/${data.id}`}>
                    <UserPermissionCardActionsEditIcon src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt="Edit permission" />
                </UserPermissionCardActionsEdit>
                <UserPermissionCardActionsDeleteButton>
                    <UserPermissionCardActionsEditIcon src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`} alt="Delete permission" />
                </UserPermissionCardActionsDeleteButton>
            </UserPermissionCardActions>
        </StyledUserPermissionCard>
    )
}

const StyledUserPermissionCard = styled.div`
background-color: ${Colors.lightGray};
border-radius: 5px;
padding: 5px 10px;
display: flex;
align-items: center;
justify-content: space-between;
`;
const UserPermissionCardLeft = styled.div`
display: flex;
align-items: center;
`;
const UserPermissionCardLeftBadge = styled.div`
border: 1px solid lightgray;
color: lightgray;
border-radius: 20px;
padding: 3px 10px;
font-size: 0.85rem;
margin-left: 10px;
`;
const UserPermissionCardLeftName = styled.p`
margin: 0;
color: white;
`;
const UserPermissionCardActions = styled.div`
display: flex;
  align-items: center;
`;
const UserPermissionCardActionsEdit = styled(Link)`
display: block;
background-color: ${Colors.primary};
border-radius: 100px;
padding:5px;
transition: 0.2s;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;
const UserPermissionCardActionsEditIcon = styled.img`
display: block;
width: 16px;
height: 16px;
`;
const UserPermissionCardActionsDeleteButton = styled.button`
display: block;
background-color: ${Colors.red};
border-radius: 100px;
border: none;
padding:5px;
transition: 0.2s;
cursor: pointer;
margin-left: 10px;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;