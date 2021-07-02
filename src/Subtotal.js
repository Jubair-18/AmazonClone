import React from 'react';
import {useHistory} from 'react-router-dom'
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import {Button} from '@material-ui/core'
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';


function Subtotal() {
    const [{basket}] = useStateValue();
    const history = useHistory();

    return (
        <div className='subtotal'>

          {/**
            this is a npm pakage for currency 
           **/}

            <CurrencyFormat
                renderText={(value)=>(
                    <>
                        <p>
                            Subtotal ({basket.length} items): <strong> {value}</strong>
                        </p>
                        <small className='subtotal__gift'>
                            <input type='checkbox' />
                            This Order Contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousamdSeparator={true}
                prefix={"$"}/>

                <Button onClick={()=> history.push('/payment')}>Checkout</Button>
        </div>
    )
}

export default Subtotal
