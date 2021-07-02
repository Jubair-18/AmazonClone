import React from 'react'
import './Home.css'
import Product from './Product'
import data from './data';

function Home() {
    return (
        <div className='home'>
            <div className="home__container">
                <img
                     className='home__image'
                     src="https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                     alt="" />
                <div className="home__row">
                   {data.map(val =>(

                           <Product className='home__product'
                           title ={val.title}
                           image ={val.image}
                            price ={val.price}
                           rating ={val.rating}
                            />
                       
                   ))}
                </div>

            </div>
        </div>
    )
}

export default Home
