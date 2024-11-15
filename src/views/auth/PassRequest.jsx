import React from 'react';
import Auth2 from '../../components/authentication/Auth2';
import PassRequestForm from '../../components/authentication/PassRequestForm';
import useTitle from '../../hooks/useTitle';
import { useTranslation } from 'react-i18next'; // Import the translation hook

const PassRequest = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  useTitle(t('passRequest.pageTitle'));  // Dynamically set title using translation

  return (
    <Auth2 authline={t('passRequest.authline')}> {/* Use translation for authline */}
      <PassRequestForm />
    </Auth2>
  );
}

export default PassRequest;
