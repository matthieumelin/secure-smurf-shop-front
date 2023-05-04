import React from 'react'

import styled from 'styled-components'
import Colors from '../../../utils/colors.util';

export default function UserOrderCard({ data }) {
    return (
        <StyledUserOrderCard>
            {data.userId}
        </StyledUserOrderCard>
    )
}

const StyledUserOrderCard = styled.div`
background-color: ${Colors.lightGray};
border-radius: 20px;
padding: 20px;
`;