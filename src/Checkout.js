import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';

function Checkout() {
    const [{ basket,user}] = useStateValue();
    return (
        <div className='checkout'>
            <div className="checkout__left">
                <img 
                    className='checkout__ad'
                    src="https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="" />
                <div>
                    <h3>{user?.email}</h3>
                    <h2 className='checkout__title'>Your Shopping Busket</h2>
                    {basket.map(item =>
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}/> 
                    )}     
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout;
