import Auth2 from '../../components/authentication/Auth2'
import LoginForm from '../../components/authentication/LoginForm'
import useTitle from '../../hooks/useTitle'

const SignIn = () => {
  useTitle('Anmelden')
  return (
    <>
      <Auth2 authline={'Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein, um sich anzumelden.'}>
        <LoginForm />
      </Auth2>
    </>
  )
}

export default SignIn
