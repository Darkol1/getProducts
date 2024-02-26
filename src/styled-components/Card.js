import React from "react";
import styled from "styled-components";

export default function Card({item, ...props}){
    return(
        <Container {...props}>
            <TextContent>
                <Name>{item.product ? item.product : 'Unknown'}</Name>
                <Id>Id: {item.id}</Id>
                <Brand>Brand: {item.brand ? item.brand : '-' }</Brand>
                <Price>Price: {item.price ? item.price : '-' }</Price>
            </TextContent>
        </Container>
    )
}

const Container = styled.div`
position: relative;
display: flex;
width: 100%;
height: auto;
border-radius: 24px;
border: 2px solid black;
`

const TextContent = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
padding: 16px;
width: 100%;
`

const Name = styled.div`
color: black;
font-size: 20px;
font-weight: 600;

@media (max-width: 600px) {
    font-size: 12px;
}`

const Id = styled.div`
color: black;
font-size: 14px;
font-weight: 600;
margin-bottom: 8px;

@media (max-width: 600px) {
    font-size: 18px;
    margin: 0;
}
`

const Brand = styled.div`
color: black;
font-size: 18px;
font-weight: 500;

@media (max-width: 600px) {
    font-size: 16px;
}
`

const Price = styled(Brand)``