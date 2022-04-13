import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { URL } from 'react-native-url-polyfill';

import { WebView } from '../components';
import { CALLBACK_URL, CANVAS_LAUNCHER_URL } from '../config';

const SERVER_IP = 'localhost';
const SERVER_PORT = 8000;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  area: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const TriageWebScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [conf, setConf] = useState<any>();

  /*
  // IMPORTANT NOTE! - **** PLEASE READ **** !!!!
  // THIS IS SAMPLE CODE ONLY.
  // IN AN ACTUAL PRODUCTION SETTING, IT IS CONSIDERED BEST PRACTICE
  // TO PASS ANY SENSITIVE DATA OVER HTTPS / TLS AT A MINIMUM.
  // THIS SAMPLE CODE IS INTENDED FOR DEMONSTRATIVE PURPOSES ONLY
  // AND IS NOT INTENDED FOR ANY REAL / PRODUCTION / HEALTH PURPOSES - AS-IS.
  */

  useEffect(() => {
    const url = `http://${SERVER_IP}:${SERVER_PORT}/tokenInfo`;
    console.info(`url=${url}`);
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        setConf(json);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.area}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Ensure all parameters are url encoded
  const webviewUri = new URL(`${CANVAS_LAUNCHER_URL}/launch`);
  webviewUri.searchParams.set('flow', 'triage');
  webviewUri.searchParams.set('client_id', conf.clientId);
  webviewUri.searchParams.set('callback_url', CALLBACK_URL);
  webviewUri.hash = `id_token=${encodeURIComponent(conf.token)}`;
  console.info(webviewUri);
  return (
    <SafeAreaView style={styles.area}>
      <WebView source={{ uri: webviewUri.toString() }} />
    </SafeAreaView>
  );
};

export default TriageWebScreen;
