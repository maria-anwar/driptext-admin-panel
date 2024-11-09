import React from 'react';
import Auth2 from '../../components/authentication/Auth2';
import LoginForm from '../../components/authentication/LoginForm';
import PassRequestForm from '../../components/authentication/PassRequestForm';
import useTitle from '../../hooks/useTitle';

const PassRequest = () => {
  useTitle('Passwort zurücksetzen');
  return (
    <Auth2 authline={'Bitte gib deine E-Mail-Adresse ein, damit wir dir einen Link zum Zurücksetzen deines Passworts senden können.'}>
       <PassRequestForm/>
    </Auth2>
  );
}

export default PassRequest;
