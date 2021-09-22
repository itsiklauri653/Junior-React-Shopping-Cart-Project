import { gql, request } from 'graphql-request';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Category } from '../models/category';
import HomePage from '../pages/HomePage';
import NavBar from './NavBar/NavBar';
import Products from './Products/Products';
import CartPage from '../pages/cart-page/CartPage';
import CartDropdown from './Cart/CartDropdown';
import Product from '../models/product';
import CurrencyOverLay from './Currency/CurrencyDropdown';
import ProductPage from '../pages/product-page/ProductPage';
import { DefaultAttribute } from '../models/attributes';


const App = () => {
  const categoryQuery = gql`
  {
    currencies,
    categories{
      name,
      products{
        id,
        name,
        inStock,
        gallery,
        description,
        category,
        attributes{
          id,
          name,
          type,
          items{
            id,
            displayValue,
            value
          }
        }
        prices{
          currency,
          amount
        },
        brand
      }
    }
  }
  `

  const {data, isError, isLoading} = useQuery('categories', () => {
    return request("http://localhost:4000/",categoryQuery);
  })

  const[cartOpen, setCartOpen] = useState(false);
  const[cartProducts, setCartProducts] = useState([] as Product[]);
  
  const[isCurrencyOverlayOpen, setIsCurrencyOverlayOpen] = useState(false);
  const[currency, setCurrency] = useState("USD")

  const[attr, setAttr] = useState<DefaultAttribute>({
    name:"",
    value:"",
    type:""
  });

  const handleAddToCart = (clickedItem: Product) => {
    setCartProducts(prev => {
        const isItemAdded = prev.find(item => item.id === clickedItem.id)

        if(isItemAdded){
          return prev.map(item => (
            item.id === clickedItem.id
              ? {...item, amount: item.amount + 1}
              : item
          ))
        }

        return [...prev, {...clickedItem, amount: 1}];
      })
  };

  const handleRemoveFromCart = (id:string) => {
    setCartProducts(prev => (
      prev.reduce((ack, item) => {
        if(item.id === id){
          if(item.amount === 1) return ack;
          return [...ack, {...item,amount: item.amount - 1}]
        } else {
          return [...ack, item]
        }
      }, [] as Product[])
    ))
  };

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
    setIsCurrencyOverlayOpen(false);
  }
  
  const handleChangeTextAttribute = (selector:string, attrValue: string) => {
    var attributeItems = document.querySelectorAll(selector);
    
    attributeItems.forEach(attributeItem => {
      var name = attributeItem.querySelectorAll("div.attr-name")[0].textContent;
      var attributes = attributeItem.querySelectorAll("div.item");
      
      attributes.forEach(attribute => {
        attribute.classList.remove("attr-active")
        setAttr({
          name:"",
          value:"",
          type:""
        })
      });
  
      attributes.forEach(attribute => {
        if(attribute.textContent === attrValue){
          attribute.classList.add("attr-active");
          setAttr({
            name:name,
            value:attribute.textContent,
            type:"text"
          })
        }
      })
    }) 
    console.log(attr)
  }

  const handleChangeColor = (selector:string, attrValue:string) => {
    function hexToRGB(hex:string, alpha:number) {
      var r = parseInt(hex.slice(1, 3), 16),
          g = parseInt(hex.slice(3, 5), 16),
          b = parseInt(hex.slice(5, 7), 16);
  
      if (alpha) {
          return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
      } else {
          return "rgb(" + r + ", " + g + ", " + b + ")";
      }
    }

    var attributeItems = document.querySelectorAll(selector);
    console.log(attributeItems)
    attributeItems.forEach(attributeItem => {
      var name = attributeItem.querySelectorAll("div.attr-name")[0].textContent;
      var attributes = attributeItem.querySelectorAll("div.item");
      
      attributes.forEach(attribute => {
        attribute.classList.remove("attr-color-active")
        setAttr({
          name:"",
          value:"",
          type:""
        })
      });
  
      attributes.forEach(attribute => {
        if(window.getComputedStyle(attribute).backgroundColor === hexToRGB(attrValue,0)){
          attribute.classList.add("attr-color-active");
          setAttr({
            name:name,
            value: attrValue,
            type:"swatch"
          })
        }
      })
    }) 
  }

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error!</div>

  return (
    <Router>
      <Container style={cartOpen ? {backgroundColor:"rgba(57, 55, 72, 0.22)"}: {}}>
          <NavBar 
            currency={currency}
            clickOnCurrency={() => setIsCurrencyOverlayOpen(!isCurrencyOverlayOpen)} 
            clickOnCart={() => setCartOpen(!cartOpen)} 
            cartItemsCount={cartProducts.length} categories={data.categories}/>
          
          <Switch>
            <Route exact path="/">
                <HomePage/>
            </Route>
            {data.categories.map((category: Category) => (
              <Route key={category.name} exact path={"/category=" + category.name}>
                {cartOpen &&
                    <CartDropdown
                      attribute={attr}
                      changeTextAttribute={handleChangeTextAttribute}
                      changeColor={handleChangeColor}
                      closeCartDropdown={() => setCartOpen(false)}
                      currency={currency}
                      products={cartProducts} 
                      addToCart={handleAddToCart}
                      removeFromCart={handleRemoveFromCart}
                    />
                }
                {isCurrencyOverlayOpen &&
                    <CurrencyOverLay 
                      changeCurrency={handleCurrencyChange}
                      currencies={data.currencies}
                    />
                }
                  <Title>{category.name.toUpperCase()}</Title>
                  <Products
                    cartAction={handleAddToCart} 
                    products={category.products}
                    currency = {currency}
                  />
              </Route>
            ))}
            <Route exact path="/cart">
                <CartPage 
                  attribute={attr}
                  changeTextAttribute={handleChangeTextAttribute}
                  changeColor={handleChangeColor}
                  changeCurrency={handleCurrencyChange}
                  currencies={data.currencies}
                  closeCartDropdown={() => setCartOpen(false)}
                  cartIsOpen={cartOpen}
                  currencyOpen={isCurrencyOverlayOpen}
                  addToCart={handleAddToCart}
                  removeFromCart={handleRemoveFromCart}
                  products={cartProducts}
                  currency = {currency}
                />
            </Route>
            <Route exact path="/product/:id">
                <div className="product-spacer" style={{marginTop:"33px"}}></div>
                {cartOpen &&
                    <CartDropdown
                      attribute={attr}
                      changeTextAttribute={handleChangeTextAttribute}
                      changeColor={handleChangeColor}
                      closeCartDropdown={() => setCartOpen(false)}
                      currency={currency}
                      products={cartProducts} 
                      addToCart={handleAddToCart}
                      removeFromCart={handleRemoveFromCart}
                    />
                }
                {isCurrencyOverlayOpen &&
                    <CurrencyOverLay 
                      changeCurrency={handleCurrencyChange}
                      currencies={data.currencies}
                    />
                }
                <ProductPage
                  attr={attr}
                  changeTextAttribute={handleChangeTextAttribute}
                  changeColor={handleChangeColor}
                  addToCart={handleAddToCart}
                  currency = {currency}
                />
            </Route>
          </Switch>
          <Footer></Footer>
      </Container>
    </Router>
  );
}

export default App

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Title = styled.h2`
    position: relative;
    height: 68px;
    left: 102px;
    top: 120.5px;
    letter-spacing: -0.3px;

    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 42px;
    line-height: 160%;

    display: flex;
    align-items: center;
    
    color: #1D1F22;
`

const Footer = styled.div`
  width: 1440px;
  height: 100px;
`