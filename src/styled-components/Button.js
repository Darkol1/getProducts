import React from "react";
import styled from "styled-components";

export default function Button({children, ...props}){
    return (
    <Container {...props}>
        <ButtonText>{children}</ButtonText>
    </Container>
    )
}

const Container = styled.button`
position: relative;
height: 56px;
border-radius: 24px;
cursor: pointer;
padding: 16px 16px;
border: 2px solid black;
min-width: 120px;
width: 50%;

&:hover {
    border: 2px solid #476582;
}

&:focus {
    outline: none;
    border: 2px solid black;
}
`

const ButtonText = styled.div`
font-size: 20px;
font-weight: 700;
color: black;
`