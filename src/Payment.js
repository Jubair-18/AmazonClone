import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link,useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import {Button} from '@material-ui/core'
import axios from './axios';
import {db} from './firebase';

function Payment() {
    const [{ basket,user}, dispatch] = useStateValue()

    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [processing ,setProcessing] = useState(false);
    const [succeeded ,setSucceeded] = useState(false);
    const [error ,setError] = useState(null);
    const [disabled ,setDisabled] = useState(true);
    const [clientSecret ,setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () =>{
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) *100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent })=>{

        // paymentIntent = payment confirmation

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            })

            console.log(payload);
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders');
        })

    }
    const handleChange = (e) =>{

        setDisabled(e.empty);
        setError(e.error ? e.error.message : '')
    }

    return (
        <div className='payment'>
            <div className="payment__container">

                <h1>CheckOut (<Link to='/checkout'> {basket?.length} items</Link>)</h1>

                <div className="paymnent__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Fatehabad,Hathazari</p>
                        <p>Chattogram,Bangladesh</p>
                    </div>
                </div>
                <div className="paymnent__section">
                    <div className="payment__title">
                        <h3>Review items & Delivery</h3>
                    </div>
                    <div className="payment__item">
                        {basket.map(item=>(
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}/> 

                        ))}
                    </div>
                </div>
                <div className="paymnent__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                {/****** Stripe for payment system ******/}
                    <form onSubmit={handleSubmit}>
                        <CardElement 
                            onChange={handleChange}/>
                        <div className="payment__priceContainer">
                        <CurrencyFormat
                            renderText={(value)=>(
                                <h3>Order Total:  {value}</h3>
                            )}
                            decimalScale={2}
                            value={getBasketTotal(basket)}
                            displayType={"text"}
                            thousamdSeparator={true}
                            prefix={"$"}/>
                            <Button onClick={handleSubmit} disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>processing</p>:"Buy Now"}</span>
                            </Button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
