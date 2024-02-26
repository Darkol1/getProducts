import React from "react";
import styled from "styled-components";

export default function Header() {
    return (
        <Container>
            <Content>Каталог товаров</Content>
        </Container>
    )
}

const Container = styled.div`
`

const Content = styled.h1`
color: black;
`

