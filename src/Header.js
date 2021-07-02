import React from 'react'
import './Header.css';
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import {Link} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import { auth } from './firebase'
function Header() {
const [{ basket,user}] = useStateValue();
const handleAuth = () => {
    if(user){
        auth.signOut();
    }
}
    return (
        <div className='header'>
            <Link to='/'>
                <img
                    className='header__logo'
                    src="https://pngimg.com/uploads/amazon/small/amazon_PNG21.png"
                    alt="" />
            </Link>
     
                <div className="header__search">
                    <Input
                        className='header__searchInput'
                        type='text'
                        placeholder='Search Item'
                     />
                    <SearchIcon className='header__searchIcon' />
                </div>

                <div className="header__nav">
                    <Link to={!user && '/login'}>
                    <div onClick={handleAuth} className="header__option">
                        <span className='header__optionLineOne'>{user?.email} </span>
                        <span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                    </Link>
                    <Link to='/orders'>
                    <div className="header__option">
                        <span className='header__optionLineOne'>Your</span>
                        <span className='header__optionLineTwo'>Orders</span>
                    </div>
                    </Link>
                    <Link to='/checkout'>
                        <div className="header__optionBusket">
                            <LocalMallIcon />
                            <span className='header__optionLineTwo header__busketCount'> {basket?.length}</span>
                        </div>
                    </Link>

                </div>
            </div>

    )
}

export default Header;
