import React from 'react';
import styled from 'styled-components';
import ColorCircle from '../components/ColorCircle';
import { currencyFormatter } from '../utility/functions';


export default function OptionCard({ram, rom, price, colors}) {
    return (
        <Container>
            <Spec>
                {ram}GB/{rom}GB
            </Spec>
            <Price>{currencyFormatter(price)} Kyats</Price>
            <ColorsWrapper>
                {colors.map((color, i) => {
                    return (
                        <ColorCircle key={i} color={color}></ColorCircle>
                    )
                })}
            </ColorsWrapper>
        </Container>
    )
}


const Container = styled.div`
    min-width: 150px;
    width: max-content;
    min-height: 100px;
    height: max-content;
    border: 1px soild #df9191;
    outline: 1px solid grey;
    padding: 10px;
    text-align: center;
    color: rgba(0,0,0,0.8);
    font-size: 13px;
`;

const Spec = styled.div`
   
`;

const Ram = styled.p`
    width: max-content;
    display: inline-block;
`;

const Rom = styled.p`
    display: inline-block;
`;
const Price = styled.div`
`;

const ColorsWrapper = styled.div`
    margin: auto;
    display: flex;
    width: max-content;
    gap: 10px;
    background-color: #dadada;
    border-radius: 10px;
    padding: 5px;
`;