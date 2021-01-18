import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledError = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Error() {
    return (
        <StyledError>
            <h1>You are lost Dude, Go back <Link to="/" >Home</Link> </h1>
        </StyledError>
    )
}

export default Error
