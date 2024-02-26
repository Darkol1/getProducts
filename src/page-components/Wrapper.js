import React from "react";
import styled from "styled-components";

export default function Wrapper({ children }) {
    return (
        <Container>
            <InnerContainer>{children}</InnerContainer>
        </Container>
    )
}

const Container = styled.div`
    overflow-y: auto;
	overflow-x: hidden;
	min-height: 100vh;
	height: 100%;
`
const InnerContainer = styled.div`
    width: 100%;
	min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 80px;
    padding: 40px 80px;
    align-items: center;

    @media (max-width: 600px) {
        padding: 20px 40px;
        gap: 40px;
    }
`