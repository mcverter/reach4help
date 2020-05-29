import { Alert } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from 'src/assets/logo.png';
import IntroLogo from 'src/components/IntroLogo/IntroLogo';
import IntroWrapper from 'src/components/IntroWrapper/IntroWrapper';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import { triggerLoginWithPhone } from 'src/ducks/auth/phone/actions';
import firebase from 'src/firebase';
import { AppState } from 'src/store';

import PhoneNumberEntryForm from '../../components/PhoneNumberEntryForm/PhoneNumberEntryForm';
import { PhoneVerifyLocation } from '../../pages/routes/PhoneVerifyRoute/constants';

const PhoneEntryContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);
  const loading = useSelector((state: AppState) => state.auth.loading);
  const confirmationResult = useSelector(
    (state: AppState) => state.auth.confirmationResult,
  );
  const error = useSelector((state: AppState) => state.auth.error);
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    if (confirmationResult) {
      history.push(PhoneVerifyLocation.path);
    }
  }, [confirmationResult, history]);

  const handleEntrySubmit = (
    values: { phoneNumber: string },
    // eslint-disable-next-line @typescript-eslint/camelcase
    recaptchaVerifier: firebase.auth.RecaptchaVerifier_Instance,
  ) => {
    if (user) {
      dispatch(
        triggerLoginWithPhone({
          currentUser: user,
          recaptchaVerifier,
          phoneNumber: values.phoneNumber,
        }),
      );
    }
  };

  const errorMessage = useMemo(
    () =>
      error && error.message
        ? `Your number is ${error.message},
        Please Make sure you entered a valid Mobile Number capable of receiving SMS with the country code prefixing it`
        : null,
    [error],
  );
  const profilePhoto = useMemo(
    () => (user?.photoURL ? `${user.photoURL}?height=300` : logo),
    [user],
  );
  return (
    <IntroWrapper>
      {errorMessage && <Alert message={errorMessage} type="error" />}
      <IntroLogo src={profilePhoto} alt="User logo" />
      <TitleWithAddon level={4}>
        {`${t('welcome')}, ${user?.displayName}`}
      </TitleWithAddon>
      <PhoneNumberEntryForm
        loading={loading}
        reset={error instanceof Error}
        handleFormSubmit={handleEntrySubmit}
      />
    </IntroWrapper>
  );
};

PhoneEntryContainer.propTypes = {};

export default PhoneEntryContainer;
