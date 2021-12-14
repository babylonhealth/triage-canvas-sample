import React from 'react';
import { Text, SafeAreaView, StyleSheet, Button } from 'react-native';

import { Section } from '../components';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Section>
        <Text style={styles.sectionTitle}>Home Screen</Text>
      </Section>
      <Section>
        <Button
          title="Start Triage"
          onPress={() => navigation.navigate('TriageWebview')}
        />
      </Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default HomeScreen;
