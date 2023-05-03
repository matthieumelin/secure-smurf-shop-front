import React from 'react'

import styled from 'styled-components'

export default function UserPermissionCard({ data }) {
    return (
        <StyledUserPermissionCard>
            <UserPermissionCardName>{data.name}</UserPermissionCardName>
        </StyledUserPermissionCard>
    )
}

const StyledUserPermissionCard = styled.div``;
const UserPermissionCardName = styled.p``;