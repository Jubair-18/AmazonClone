import React from 'react';
import './CheckoutProduct.css'
import {Button} from '@material-ui/core'
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,image,title,price,rating,hideButton}) {
    const  [{ }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        })
    }
   
    return (
        <div className='checkoutProduct'>
                <img
                    className='checkoutProduct__image'
                    src={image} 
                    alt="" />
            <div className="CheckoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_,i)=>(
                        <p>⭐</p>
                    ))}
                </div>
                { !hideButton ?(
                <Button onClick={removeFromBasket}>Remove</Button>
                ): ''}
            </div>
        </div>
    )
}

export default CheckoutProduct
