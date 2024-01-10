import { useEffect, useState } from "react";

import { CloseButton } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FaCartShopping } from "react-icons/fa6";


function Cart(){

    let [cart , setCart] = useState([]);
    const [isCartOpen, setCartOpen] = useState(false);

    let count = cart.length;

    useEffect(()=>{
        setTimeout(()=>{
            let localData = JSON.parse(localStorage.getItem('Cart'));
            if(localData == null){
                setCart([]);
            }
            else{
                setCart(localData);
            }
        },1000)
    })


    const handleCartToggle = () => {
        setCartOpen(!isCartOpen);
    };

    return(
        <>
            <div className="add-cart-btn">
                <Button variant="success" className="cartbtn py-2 px-4" onClick={handleCartToggle}>
                    <FaCartShopping /> ({count})
                </Button>
                <div className={`overlay ${isCartOpen ? 'open' : ''}`}></div>
            </div>
            {isCartOpen && (
                <div className={`cart-box ${isCartOpen ? 'open' : ''}`}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 style={{margin : '0'}}>Your Products</h3>
                        <CloseButton onClick={handleCartToggle}/>    
                    </div>
                    <hr />
                    {cart.map((v,i)=>{
                        return(
                            <div className="data">
                                <img src={require('../assets/images/'+v.img)} width={100} height={100} className="rounded"/>
                                <div className="data-text">
                                    <h5 style={{margin : '0'}}>{v.title}</h5>
                                    <p style={{margin : '0 0 10px 0'}}>{v.price} Rs.</p>
                                    {/* <Form.Control type="number" placeholder="Enter Quantity" name="quan"/> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            
        </>
    )
}

export default Cart;