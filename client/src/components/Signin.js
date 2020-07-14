import React, { useState, useEffect } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { Link, useHistory } from 'react-router-dom';
import { showErrorMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import { signin } from '../api/auth';
const Signin = () => {
    let history = useHistory();
    useEffect(() => {
        if(isAuthenticated() && isAuthenticated().role === 1){
            //console.log('Redirection to admin dashboard');
            history.push('/admin/dashboard');
        }else if(isAuthenticated() && isAuthenticated().role === 0){ 
            //console.log('Redirecting to user dashboard');
            history.push('/user/dashboard');
        }
    }, [history])
    const[formData, setFormData] = useState({
        email: '',
        password: '',
        errorMsg: false,
        loading: false
    })
    const { email, password, errorMsg, loading } = formData;
        /*
    EVENT HANDLERS
    */
   const handleChange = evt => {
        //console.log(evt);
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            successMsg: '',
            errorMsg: ''
        });
    }  
    const handleSubmit = (evt) => {
        evt.preventDefault();

        //client side validation
        if(isEmpty(email) || isEmpty(password)){
            setFormData({
                ...formData,
                errorMsg: 'All fields are required'
            })
        } else if (!isEmail(email)){
            setFormData({
                ...formData,
                errorMsg: 'Invalid email'
            })
        } 
         else {
            const { email, password } = formData;
            const data = { email, password };
            // SUCCESS
            setFormData({
                ...formData,
                loading: true
            });
            signin(data)
                .then(response => {
                    setAuthentication(response.data.token, response.data.user);
                    if(isAuthenticated() && isAuthenticated().role === 1){
                        console.log('Redirection to admin dashboard');
                        history.push('/admin/dashboard');
                    }else if(isAuthenticated() && isAuthenticated().role === 0){
                        console.log('Redirecting to user dashboard');
                        history.push('/user/dashboard');
                    }
                })
                .catch(err => {
                    console.log('signin api function error: ', err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage
                    })
                })
        }
    }  
    /*
    VIEWS
    */
    const showSigninForm = () => (
        <form className='signup-form' onSubmit={handleSubmit} noValidate>
        {/* email */}
        <div className='form-group input-group'>
            <div className='input-group-prepend'>
                <span className='input-group-text'>
                    <i className='fa fa-envelope'></i>
                </span>
            </div>
            <input
                name='email'
                value={email}
                className='form-control'
                placeholder='Email address'
                type='email'
                onChange={handleChange}
            />
        </div>
        {/* password */}
        <div className='form-group input-group'>
            <div className='input-group-prepend'>
                <span className='input-group-text'>
                    <i className='fa fa-lock'></i>
                </span>
            </div>
            <input 
                name='password'
                value={password}
                className='form-control'
                placeholder='Create password'
                type='password'
                onChange={handleChange}
            />
        </div>
        {/* signup button */}
        <div className='form-group'>
            <button type='submit' className='btn btn-primary btn-block'>
                Signin
            </button>
        </div>
        {/* dont have account */}
        <p className='text-center text-black'>
            Don't have an account?<Link to='/signup'>Register here</Link>
        </p>
    </form>
    )
    /*
    RENDER
    */
   return (
    <div className='signin-container'>
        <div className='row px-3 vh-100'>
            <div className='col-md-5 mx-auto align-self-center'>
                {errorMsg && showErrorMsg(errorMsg)}
                {loading && <div className='text-center pd-4'>{showLoading()}</div>}
                {showSigninForm()}
            </div>
        </div>
    </div>
);
}
export default Signin;