import React from 'react'

import styled from 'styled-components'
import Colors from '../../../utils/colors.util';

export default function ProductRegionCard({ data }) {
    return (
        <StyledProductRegionCard>
            {data.id}
        </StyledProductRegionCard>
    )
}

const StyledProductRegionCard = styled.div`
background-color: ${Colors.lightGray};
border-radius: 20px;
padding: 20px;
`;