import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spin = keyframes`
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
`;

const Loader = styled.div`
    border: 16px solid #f3f3f3;
    /* Light grey */
    border-top: 16px solid #3498db;
    /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: ${Spin} 2s linear infinite;
    margin: 30px auto;
    // margin-top: 30px;
    // margin-bottom: 30px;
`;


const Spinner = () => {
    return (
        <Loader></Loader>
    )
}

export default Spinner;