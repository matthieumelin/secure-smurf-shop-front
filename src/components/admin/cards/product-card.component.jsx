import React from 'react'

import styled from 'styled-components'
import Colors from '../../../utils/colors.util';

export default function ProductCard({ data }) {
    return (
        <StyledProductCard>
            {data.id}
        </StyledProductCard>
    )
}

const StyledProductCard = styled.div`
background-color: ${Colors.lightGray};
border-radius: 20px;
padding: 20px;
`;