import React from 'react'
import Auth2 from '../../components/authentication/Auth2'
import LoginForm from '../../components/authentication/LoginForm'
import PassRequestForm from '../../components/authentication/PassRequestForm'

const PassRequest = () => {
  return (
    <Auth2 authline={'Please enter your email address so we can send you a link to reset your password.'}>
       <PassRequestForm/>
    </Auth2>
  )
}

export default PassRequest