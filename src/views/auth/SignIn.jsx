import Auth2 from '../../components/authentication/Auth2'
import LoginForm from '../../components/authentication/LoginForm'

const SignIn = () => {
  return (
    <>
      <Auth2 authline={'Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein, um sich anzumelden.'}>
        <LoginForm />
      </Auth2>
    </>
  )
}

export default SignIn
