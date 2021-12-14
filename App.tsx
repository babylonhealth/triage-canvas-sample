import React, { useEffect, useReducer } from 'react';
import { Alert, Linking } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { URLSearchParams } from 'react-native-url-polyfill';

import { AppNavigator, navigate } from './AppNavigator';
import { CALLBACK_URL } from './config';
import { CanvasError, TriageCta, TriageCtaType } from './types';

enableScreens(); // Enable native screens for react-navigation.

const parseActionFromURL = (
  url: string,
): { action?: TriageCta; canvasError?: CanvasError } => {
  const paramsString = url.split(`${CALLBACK_URL}?`)[1];
  const searchParams = new URLSearchParams(paramsString);

  const errorValue = searchParams.get('error');

  if (errorValue) {
    const canvasError = JSON.parse(errorValue);

    return { canvasError };
  }

  const ctaValue = searchParams.get('cta');
  const { action } = JSON.parse(ctaValue);

  return { action };
};

const App = () => {
  const handleTriageCtaCallback = (event: { url: string }) => {
    const { url } = event;
    if (!url.startsWith(CALLBACK_URL)) {
      return;
    }

    const { action, canvasError } = parseActionFromURL(url);

    if (canvasError) {
      Alert.alert(canvasError.error, canvasError.error_description);
      navigate('Home');
      return;
    }

    switch (action.type) {
      case TriageCtaType.CloseScreen:
        break;
      // Add your implementation for CTAs here
      case TriageCtaType.BookConsultation:
        Alert.alert('CTA book-consultation');
        break;
      case TriageCtaType.FindNearby:
        Alert.alert('CTA find-nearby', action.data.location);
        break;
      case TriageCtaType.OpenUrl:
        Alert.alert('CTA open-url', action.data.url);
        break;
      case TriageCtaType.Phone:
        Alert.alert('CTA phone', action.data.number);
        break;
      default:
        Alert.alert('Unknown CTA', JSON.stringify(action));
        break;
    }
    // Navigate to the required location for each CTA
    navigate('Home');
  };

  useEffect(() => {
    const linkingSubscription = Linking.addEventListener(
      'url',
      handleTriageCtaCallback,
    );

    return () => linkingSubscription.remove();
  }, []);

  return (
    <AppNavigator />
  );
};

export default App;
