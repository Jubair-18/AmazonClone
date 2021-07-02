import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {TextField,Button} from '@material-ui/core'
import {auth} from './firebase';

import './Login.css';
function Login() {

    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

  /*****for signIn with firebase *****/

    const signIn = (e) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email,password)
            .then((auth)=>{
                if(auth){
                    history.push('/');
                }})
            .catch((err)=>{
                console.error(err);
            })
    }
  /*****for registration with firebase *****/

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            if(auth){
                history.push('/');
            }})
        .catch((err)=>{
            console.error(err);
        })
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img 
                    className='login__logo'
                    src="https://pngimg.com/uploads/amazon/small/amazon_PNG21.png"
                    alt="" />
            </Link>
            <div className="login__container">
                <h1>Sign In</h1>

                    <form>
                        <TextField
                        className='login__input'
                        label="Email" variant="outlined" 
                        value={email}
                        onChange ={e =>setEmail(e.target.value)}
                        />

                        <TextField
                        className='login__input'
                        label="Password"
                        type="password" 
                        variant="outlined"
                        value={password}
                        onChange ={e =>setPassword(e.target.value)}
                         />

                        <Button 
                        className='login__signInButton'
                        type='submit'
                        onClick={signIn}
                        >Sign In</Button>
                    </form>

                    <Button
                    onClick={register}
                     className='login__registerButton'>Create An Account</Button>


                </div>
            </div>
    
    )
}

export default Login;
