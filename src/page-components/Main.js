import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import CryptoJS from "crypto-js";
import Card from "../styled-components/Card";
import Select from "../styled-components/Select";
import Button from "../styled-components/Button";

const numberOfItems = 50;
const date = new Date();
const year = date.getUTCFullYear();
const month = date.getUTCMonth() + 1 < 10 ? "0" + (date.getUTCMonth() + 1) : date.getUTCMonth();
const day = date.getUTCDate();
const hash = CryptoJS.MD5('Valantis_' + `${year}` + `${month}` + `${day}`).toString();
const url = 'https://api.valantis.store:41000/';
const config = { headers: { 'X-Auth': hash } };


export default function Main() {

  const [products, setProducts] = useState(null);
  const [currentProducts, setCurrentProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [err, setErr] = useState(0);
  const [nameSelect, setNameSelect] = useState('');
  const [priceSelect, setPriceSelect] = useState('');
  const [brandSelect, setBrandSelect] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [productsId, setProductsId] = useState(null);

  const fetchProductIds = async () => {
    try {
      const idResponse = await axios.post(url, { "action": "get_ids" }, config);
      const productIds = idResponse.data.result;
      setProductsId(productIds);
      setCurrentPage(1);
      
      if (idResponse.status !== 200) {
        throw new Error('Network error');
      }
    } catch (error) {
      console.error(error);
      setErr(prev => prev + 1);
    }
};

function sort(arr) {
  const uniqueMap = {}; 
  const uniqueArray = []; 

  for (let i = 0; i < arr.length; i++) {
    const valueId = arr[i].id;
  
    if (!uniqueMap[valueId]) {
      uniqueMap[valueId] = true; 
      uniqueArray.push(arr[i]); 
    }
  }
  return uniqueArray;
}

const createPageContent = async () => {
  if (!productsId) return;
  const startIndex = currentPage * numberOfItems - numberOfItems;
  let endIndex = startIndex  + numberOfItems;
  if ( endIndex > productsId.length) { endIndex = productsId.length};

  function funcSlice(start, end) {return (productsId.slice(start, end))}
  try {

    const productDetailsResponse = await axios.post(url, {
      "action": "get_items",
      "params": { "ids": funcSlice(startIndex, endIndex) }
    }, config);

    
    if (productDetailsResponse.status !== 200) {
      throw new Error('Network error');
    }

    const productDetails = productDetailsResponse.data.result;

    const uniqValues = await sort(productDetails);
    setCurrentProducts(uniqValues);
    setFilteredProducts(uniqValues);
    setProducts(uniqValues);
  } catch (error) {
    console.error(error);
    setErr(prev => prev + 1);
  }
};

  useEffect( () => {
    fetchProductIds();
  }, []);

  useEffect( () => {
    createPageContent();
    setNameSelect('');
    setPriceSelect('');
    setBrandSelect('');
  }, [currentPage, err]);

  useEffect(() => {
    if (err && err < 5) {
      fetchProductIds();
    }
  }, [err]);

  useEffect(() => {
    if (products) {
      const startIndex = currentPage * numberOfItems - numberOfItems;
      const endIndex = startIndex  + numberOfItems;
      setCurrentProducts(products.slice(startIndex, endIndex));
      setFilteredProducts(products.slice(startIndex, endIndex));
      setNameSelect('');
      setPriceSelect('');
      setBrandSelect('');
    }

  }, [currentPage]);

  useEffect(() => {
    if (!currentProducts) return;

    const filteredList = currentProducts.filter(product => { return (
      ( product.product ? product.product.toString().includes(nameSelect) : true ) &&
      ( product.price ? product.price.toString().includes(priceSelect) : true ) &&
      ( product.brand ? product.brand.toString().includes(brandSelect) : '-'.includes(brandSelect) ))
    });
    setFilteredProducts(filteredList);

    
  }, [nameSelect, priceSelect, brandSelect]);

    return (
        <Container>
            <ButtonWrapper>
                <Button onClick={() => setCurrentPage(prevPage => prevPage === 1 ? prevPage :  prevPage - 1)}>Назад</Button>
                <Button onClick={() => setCurrentPage(prevPage => prevPage === Math.floor(products.length/numberOfItems) ? prevPage :  prevPage + 1)}>Вперед</Button>
            </ButtonWrapper>

            <SelectWrapper>
              <Select onChange={(e) => setNameSelect(e.target.value)} arr={currentProducts} value={'product'}/>
              <Select onChange={(e) => setPriceSelect(e.target.value)} arr={currentProducts} value={'price'}/>
              <Select onChange={(e) => setBrandSelect(e.target.value)} arr={currentProducts} value={'brand'}/>
            </SelectWrapper>
           
            { filteredProducts && 
            filteredProducts.map(item => (
            <Card key={item.id} item={item} />
            ))}
        </Container>
    )
}

const Container = styled.div`
display: flex;
gap: 32px;
flex-wrap: wrap;
`

const ButtonWrapper = styled.div`
display: flex;
gap: 32px;
width: 100%;`

const SelectWrapper = styled.div`
display: flex;
gap: 32px;
width: 100%;
`