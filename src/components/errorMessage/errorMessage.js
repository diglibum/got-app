import React from 'react';
import img from './error.jpg';
import styled from 'styled-components';


const ErrorImage = styled.div`
width: 100%;
`;

const ErrorContent = styled.h3`
    margin-top: 20px;
    color: red;
    width: 100%;
    text-align: center;
`;

const ErrorMessage = () => {
    return (
        <>
            <ErrorImage><img src={img} alt="error" /></ErrorImage>
            <ErrorContent>Что-то пошло не так</ErrorContent>
        </>
    )
}

export default ErrorMessage;
