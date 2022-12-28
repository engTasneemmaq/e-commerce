import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Home from "./Screen/Home";
import ProductScreen from "./Screen/ProductScreen";

function App() {
  return (
    <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="warning" variant="dark">
          <Container>
            <LinkContainer to="/">
            <Navbar.Brand>ToTi Store</Navbar.Brand>
            </LinkContainer>

          </Container>
        </Navbar>
      </header>
     <main>
      <Container>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:slug" element={<ProductScreen/>} />
      </Routes>

      </Container> 
     </main>
     <footer>
      <div className="text-center">
      All Right Reserved
      </div></footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
