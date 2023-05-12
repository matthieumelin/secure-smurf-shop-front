import React from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components'
import AppRoutes from '../../../router/app.routes';

import Colors from '../../../utils/colors.util';

export default function ProductCard({ data, onDeleteProduct }) {
    return (
        <StyledProductCard>
            <ProductCardInfos>
                <ProductCardInfosText>Name: {data.name}</ProductCardInfosText>
                <ProductCardInfosText>Region: {data.region}</ProductCardInfosText>
            </ProductCardInfos>
            <ProductCardActions>
                <ProductCardActionsLink to={AppRoutes.AdminProductEdit.replace(":id", data.id)}>Edit</ProductCardActionsLink>
                <ProductCardActionsDelete style={{ backgroundColor: Colors.red }} onClick={() => onDeleteProduct(data)}>Delete</ProductCardActionsDelete>
            </ProductCardActions>
        </StyledProductCard>
    )
}

const StyledProductCard = styled.div`
background-color: ${Colors.lightGray};
border-radius: 20px;
padding: 20px;
`;
const ProductCardInfos = styled.div`
margin: 10px 0;
`;
const ProductCardInfosText = styled.p`
margin: 0;
color: white;
`;
const ProductCardActions = styled.div`
display: grid;
grid-gap: 10px;
`;
const ProductCardActionsLink = styled(Link)`
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
const ProductCardActionsDelete = styled.button`
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
cursor: pointer;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;