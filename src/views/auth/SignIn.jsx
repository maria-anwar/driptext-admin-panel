import Auth2 from '../../components/authentication/Auth2'
import LoginForm from '../../components/authentication/LoginForm'
import useTitle from '../../hooks/useTitle'
import {useTranslation} from 'react-i18next'
const SignIn = () => {
  const {t} = useTranslation()
  useTitle(t('login.pageTitle'))
  return (
    <>
      <Auth2 authline={t('login.authline')}>
        <LoginForm />
      </Auth2>
    </>
  )
}

export default SignIn
