import React from 'react';
import { StyleSheet } from 'react-native';
import WebView, { WebViewProps } from 'react-native-webview';

type Props = WebViewProps;

const MyWebView = React.forwardRef<WebView, Props>((props, ref) => {
  const { style } = props;
  return (
    <WebView
      {...props}
      ref={ref}
      style={[styles.webview, style]}
      androidHardwareAccelerationDisabled
    />
  );
});

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default MyWebView;
