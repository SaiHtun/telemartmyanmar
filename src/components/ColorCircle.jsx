import React from 'react';
import styled from 'styled-components';

export default function ColorCircle({color}) {
    return (
        <Container color={color}>
            
        </Container>
    )
}

const Container = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: ${(props) => props.color? props.color: "white"};
`;