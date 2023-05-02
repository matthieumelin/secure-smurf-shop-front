import React from 'react'

import styled from 'styled-components'

export default function CardStat({ data }) {
    return (
        <StyledCardStat color={data.color}>
            <CardStatTitle>{data.title}</CardStatTitle>
            <CardStatValue>{data.value}</CardStatValue>
        </StyledCardStat>
    )
}

const StyledCardStat = styled.div`
border: 1px solid white;
border-radius: 10px;
padding: 20px;
`;
const CardStatTitle = styled.h3`
color: white;
font-weight: 400;
margin: 0;
`;
const CardStatValue = styled.h1`
color: white;
margin: 0;
`;