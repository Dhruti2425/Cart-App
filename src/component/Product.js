import { useContext, useEffect } from "react";
import Cart from "./Cart";
import { productContext } from "../App";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';

import Card from 'react-bootstrap/Card';

import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCartShopping } from "react-icons/fa6";

function Product(){
    let pr = useContext(productContext);

    let [show, setShow] = useState(false);
    let [product, setProduct] = useState({});
    let [data, setData] = useState([]);
    let [cart , setCart] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let count = cart.length;

    useEffect(() => {
        setTimeout(()=>{
            let localData = JSON.parse(localStorage.getItem('Product'));
            if(localData == null){
                setData([]);
            }
            else{
                setData(localData);
            }
        },1000);
    },setData);


    let getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if(name == 'img'){
            value = value.substr(12, value.length);
        }

        setProduct({...product , [name] : value});
    }

    let handleSubmitData = (e) => {
        e.preventDefault();

        product['id'] = Math.round(Math.random() * 1000);
        let dd = [...data,product];
        setData(dd);
        localStorage.setItem('Product',JSON.stringify(dd));
        setProduct({});
    }

    let cartData = (id) => {
        let pos = data.findIndex((v) => v.id == id);
        let isProductInCart = cart.some((v) => v.id === id);
        if (!isProductInCart) {
            let cartData = [...cart , data[pos]];
            setCart(cartData);
            localStorage.setItem('Cart',JSON.stringify(cartData));
        }
    }

    return(
        <>
            <div className="add-cart-btn">
                <Button variant="success" className="addbtn py-2 px-4 me-3" onClick={handleShow}>
                    ADD
                </Button>
                <Button variant="success" className="cartbtn py-2 px-4">
                    <FaCartShopping /> ({count})
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method="post" onSubmit={(e) => handleSubmitData(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter your product title" name="title" onChange={(e) => getInputValue(e)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter your product price" name="price" onChange={(e) => getInputValue(e)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="des" onChange={(e) => getInputValue(e)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="img" onChange={(e) => getInputValue(e)}/>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" type="submit"  onClick={handleClose}>Add Product</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            <Container>
                <div className="allproduct">
                    <Row>
                        {data.map((v,i) => {
                            return(
                                <Col xl={3} lg={4} sm={6} xs={12}>
                                    <Card style={{height : '400px' , boxShadow : '0 0 10px rgba(0, 0, 0, 0.3)'}}>
                                        <Card.Img variant="top" src={require('../assets/images/'+ v.img)}/>
                                        <Card.Body className="p-3">
                                            <Card.Title>{v.title}</Card.Title>
                                            <Card.Subtitle className="pt-1 pb-2">{v.price} Rs</Card.Subtitle>
                                            <Card.Text style={{color : '#5f5f5f'}}> {v.des} </Card.Text>
                                            <Button variant="success" className="addcartbtn" onClick={(id) => cartData(v.id)}>Add To Cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </Container>

            <Cart />
        </>
    )
}

export default Product;