import React from 'react';
import { View, StyleSheet } from 'react-native';

const Section = ({ children }) => (
  <View style={styles.sectionContainer}>{children}</View>
);

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default Section;
