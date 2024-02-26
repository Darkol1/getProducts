import React from "react";
import styled from "styled-components";

export default function Select({arr, value, ...props}){
    if (!arr) return;
    const filteredArr = [];
    for (let i = 0; i < arr.length; i++ ){
       
        if ( !filteredArr.includes(arr[i][value]) && arr[i][value]){
            filteredArr.push(arr[i][value]);
        }
        if ( !arr[i][value] && !filteredArr.includes('-') ) filteredArr.push('-');
    }

    return(
    <Container {...props}>
        <Option defaultValue value={''}>Фильтр {value === 'product' ? 'по названию (все)' : value === 'price' ? 'по цене (все)' : 'по бренду (все)'}</Option>
        {
            filteredArr &&
            filteredArr.map(item =>  {return <Option key={item} value={item}>{item}</Option>})
        }
    </Container>
    )
}

const Container = styled.select`
height: 48px;
border-radius: 24px;
border: 2px solid black;
outline: none;
padding: 8px;
width: 100%;
color: black;
`

const Option = styled.option`
font-size: 16px;
color: black;
`