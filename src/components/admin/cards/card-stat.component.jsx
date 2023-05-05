import React from 'react'

import styled from 'styled-components'

import Colors from '../../../utils/colors.util';

export default function CardStat({ data }) {
    return (
        <StyledCardStat>
            <CardStatIcon src={`${process.env.PUBLIC_URL}/assets/icons/${data.icon}`} alt={data.title} />
            <CardStatInfos>
                <CardStatInfosTitle>{data.title}</CardStatInfosTitle>
                <CardStatInfosValue>{data.value}</CardStatInfosValue>
            </CardStatInfos>
        </StyledCardStat>
    )
}

const StyledCardStat = styled.div`
background-color: ${Colors.lightGray};
border-radius: 10px;
padding: 20px;
display: flex;
align-items: center;
`;
const CardStatIcon = styled.img`
display: block;
width: 50px;
height: 50px;
`;
const CardStatInfos = styled.div`
margin-left: 20px;
`;
const CardStatInfosTitle = styled.h3`
color: white;
font-weight: 400;
margin: 0;
`;
const CardStatInfosValue = styled.h1`
color: white;
margin: 0;
`;