import React from 'react'

import styled from 'styled-components';
import Colors from '../utils/colors.util';

export default function Loading() {
  return (
    <StyledLoading />
  )
}
const StyledLoading = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%) rotate(0deg);
height: 100px;
width: 100px;
border: 10px solid ${Colors.primary};
border-top: 10px solid transparent;
border-left: 10px solid transparent;
border-radius: 100px;
-webkit-animation: loading 3s ease-in-out forwards infinite;
animation: loading 3s ease-in-out forwards infinite;

@keyframes loading {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    } 
} 
`;