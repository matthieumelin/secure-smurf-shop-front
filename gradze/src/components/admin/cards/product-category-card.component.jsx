import React from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components'

import Colors from '../../../utils/colors.util';
import { capitalizeFirstLetter } from "../../../utils/string.util";

import AppRoutes from '../../../router/app.routes';

export default function ProductCategoryCard({ data, onDelete }) {
    return (
        <StyledProductCategoryCard>
            <ProductCategoryCardLeft>
                <ProductCategoryCardLeftName>{capitalizeFirstLetter(data.name)}</ProductCategoryCardLeftName>
                <ProductCategoryCardLeftBadge enabled={data.enabled}>{data.enabled ? "Enabled" : "Disabled"}</ProductCategoryCardLeftBadge>
            </ProductCategoryCardLeft>
            <ProductCategoryCardActions>
                <ProductCategoryCardActionsButton to={`${AppRoutes.AdminProductCategoryEdit.replace(":id", data.id)}`}>
                    <ProductCategoryCardActionsButtonIcon src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt="Edit permission" /> Edit
                </ProductCategoryCardActionsButton>
                <ProductCategoryCardActionsButton style={{ backgroundColor: Colors.red }} onClick={() => onDelete(data)}>
                    <ProductCategoryCardActionsButtonIcon src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`} alt="Delete permission" /> Delete
                </ProductCategoryCardActionsButton>
            </ProductCategoryCardActions>
        </StyledProductCategoryCard>
    )
}

const StyledProductCategoryCard = styled.div`
background-color: ${Colors.lightGray};
border-radius: 5px;
padding: 10px 20px;

@media screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
`;
const ProductCategoryCardLeft = styled.div`
display: flex;
align-items: center;
`;
const ProductCategoryCardLeftName = styled.p`
margin: 0;
color: white;
`;
const ProductCategoryCardLeftBadge = styled.div`
border: 1px solid lightgray;
color: lightgray;
border-radius: 20px;
padding: 3px 10px;
font-size: 0.85rem;
margin-left: 10px;

${props => {
    if (props.enabled) {
        return `
        border: 1px solid ${Colors.green};
        color: ${Colors.green};
        `;
    }
}}
`;
const ProductCategoryCardActions = styled.div`
margin-top: 10px;
display: grid;
grid-template-columns: repeat(2, max-content);
grid-gap: 10px;
max-width: max-content;

@media screen and (min-width: 1024px) {
    margin-top: 0;
}
`;
const ProductCategoryCardActionsButton = styled(Link)`
display: block;
background-color: ${Colors.primary};
border-radius: 100px;
padding:3px 20px;
transition: 0.2s;
display: flex;
align-items: center;
text-decoration: none;
color: white;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;
const ProductCategoryCardActionsButtonIcon = styled.img`
display: block;
width: 16px;
height: 16px;
margin-right: 10px;
`;