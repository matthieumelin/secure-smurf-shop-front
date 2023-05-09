import React from 'react'
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';

import styled from 'styled-components'
import Colors from '../../../utils/colors.util';

export default function UserCard({ data, onDisable }) {
    return (
        <StyledUserCard>
            <UserCardAvatar email={data.email} />
            <UserCardInfos>
                <UserCardInfosText>{data.username}</UserCardInfosText>
                <UserCardInfosText type="truncate">{data.email}</UserCardInfosText>
            </UserCardInfos>
            <UserCardActions>
                <UserCardActionsLink to="/">Edit</UserCardActionsLink>
                <UserCardActionsDisable style={{ backgroundColor: Colors.red }} onClick={() => onDisable(data)}>Disable</UserCardActionsDisable>
            </UserCardActions>
        </StyledUserCard>
    )
}

const StyledUserCard = styled.div`
background-color: ${Colors.lightGray};
border-radius: 20px;
padding: 20px;
`;
const UserCardAvatar = styled(Gravatar)`
width: 60px;
height: 60px;
display: block;
border-radius: 2px;
`;
const UserCardInfos = styled.div`
margin: 10px 0;
`;
const UserCardInfosText = styled.p`
margin: 0;
color: white;
`;
const UserCardActions = styled.div`
display: grid;
grid-gap: 10px;
`;
const UserCardActionsLink = styled(Link)`
text-decoration: none;
color: white;
background-color: ${Colors.primary};
border-radius: 2px;
padding: 5px;
display: block;
text-align: center;
transition: 0.2s;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;
const UserCardActionsDisable = styled.button`
color: white;
background-color: ${Colors.primary};
border-radius: 2px;
border: none;
padding: 5px;
display: block;
text-align: center;
transition: 0.2s;
font-family: inherit;
font-size: inherit;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;