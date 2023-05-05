import React from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components'
import AppRoutes from '../../../router/app.routes';
import Colors from '../../../utils/colors.util';

export default function ProductRegionCard({ data, onDeleteProductRegion }) {
    return (
        <StyledProductRegionCard>
            <ProductRegionCardImage src={`${process.env.PUBLIC_URL}/assets/images/servers/${data.shortName.toUpperCase()}.png`} alt={data.name} />
            <ProductRegionCardRight>
                <ProductRegionCardRightInfos>
                    <ProductRegionCardRightInfosName>
                        {data.name}
                    </ProductRegionCardRightInfosName>
                </ProductRegionCardRightInfos>
                <ProductRegionCardRightActions>
                    <ProductRegionCardRightActionsLink to={AppRoutes.AdminProductsRegionsEdit.replace(":id", data.id)}>Edit</ProductRegionCardRightActionsLink>
                    <ProductRegionCardRightActionsButton onClick={() => onDeleteProductRegion(data)}>
                        Delete
                    </ProductRegionCardRightActionsButton>
                </ProductRegionCardRightActions>
            </ProductRegionCardRight>
        </StyledProductRegionCard>
    )
}

const StyledProductRegionCard = styled.div`
background-color: ${Colors.lightGray};
border-radius: 20px;
display: flex;
align-items: center;
`;
const ProductRegionCardImage = styled.img`
display: block;
border-radius: 20px 0 0 20px;
height: 100%;
width: 80px;
`;
const ProductRegionCardRight = styled.div`
margin-left: 20px;
`;
const ProductRegionCardRightInfos = styled.div`
`;
const ProductRegionCardRightInfosName = styled.h3`
color: ${Colors.primary};
margin: 0;
`;
const ProductRegionCardRightActions = styled.div`
display: flex;
align-items: center;
margin: 10px 0;
`;
const ProductRegionCardRightActionsLink = styled(Link)`
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
const ProductRegionCardRightActionsButton = styled.button`
text-decoration: none;
color: white;
background-color: ${Colors.red};
border-radius: 2px;
border: none;
padding: 5px;
transition: 0.2s;
font-family: inherit;
font-size: inherit;
margin-left: 10px;

&:hover {
    transition: 0.2s;
    -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.07);
  }
`;