import React from 'react'
import Auth2 from '../../components/authentication/Auth2'
import LoginForm from '../../components/authentication/LoginForm'
import ForgotPasswordForm from '../../components/authentication/ForgotPasswordForm'

const ForgotPassword = () => {
  return (
    <>
    <Auth2 authline={'Enter your password to Sign In.'}>
       <ForgotPasswordForm/>
    </Auth2>
    </>
  )
}

export default ForgotPassword