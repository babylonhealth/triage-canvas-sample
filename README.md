# Getting Started With React Native

1. Install `node`, `yarn` and `watchman`

```
brew install node
brew install yarn
brew install watchman
```

## iOS

1. Complete the steps in the Getting Started section.
2. Install Xcode version 10 or newer either from the Apple App Store or the developer website.
3. Add cocoapods to your machine by running `sudo gem install cocoapods`
4. Run `yarn` from the root of the project.
5. Run `pod install` from the `ios` folder.
6. Run `yarn ios` from the root of the project to build the app on your Xcode simulator.
   - If you wish to install it on a specific simulator device you can add the flag to the start command `--simulator="<device-name>"` for example `yarn ios --simulator="iPhone 12 Pro Max"`
7. Run `yarn start` to start the metro bundler. To support live reloads, make sure you have installed watchman.

## Android

### Android emulator

1. Download [Android Studio](https://developer.android.com/studio).
2. [Create an Android Virtual Device](https://developer.android.com/studio/run/managing-avds#createavd)

   > Gotcha #1: There may not be a Tools > AVD Manager option when you first load Android Studio. You may be able to launch it by pressing `cmd` + `shift` + `a` and searching for 'AVD' in the actions tab, alternatively there is an icon on the toolbar (a mobile with the android mascot in-front)

   > Gotcha #2: You will need to ensure you set up the emulator with the correct SDK version (currently 28)

3. Download the [JDK](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html)

### Running on Android

1. Complete the steps in the `Getting Started` section and the `Android Emulator` section.
2. Run `yarn` from the root of the project if you haven't already.
3. Run `yarn android` from the root of the project to build the app on your Xcode simulator.
4. Run `yarn start` to start the metro bundler. To support live reloads, make sure you have installed watchman.

# Triage Canvas Integration

## Webview Setup

The Triage Canvas will be housed inside a webview, so create a webview in the place you would like the Triage Canvas to appear. In this example we have chosen to use the package `react-native-webview`.

```
   <WebView
      source={{ uri }}
   />
```

The most important thing to note on the snippet above is the `uri`. The uri will point the webview at the correct canvas instance and will allow you to pass things such as user tokens between your app and the Triage Canvas. We will construct this is the following steps to make sure we have everything we need to launch the canvas.

## URI Construction

```
<!-- Triage Canvas Uri -->

${baseUrl}launch?flow=triage&client_id=${clientId}&callback_url=https://example.com#id_token=${idToken}`

<!-- Construction -->

  const webviewUri = new URL(`${baseUrl}/launch`);
  webviewUri.searchParams.set('flow', 'triage');
  webviewUri.searchParams.set('client_id', clientId);
  webviewUri.searchParams.set('callback_url', CALLBACK_URL);
  webviewUri.hash = `id_token=${encodeURIComponent(idToken)}`;
```

### Parameters

- `baseUrl`: link to triage canvas domain, which will be https://canvas.uk.dev.babylontech.co.uk/ (update this once finalised)
- `flow`: this refers to the type of conversation flow we are using for the canvas conversation. This will be `triage`.
- `client_id`: the authorization id assigned to the specific partner.
- `id_token`: the id token to be passed to the triage canvas to identify and authenticate a user.
- `callback_url`: this is the callback url to the partner app. This will be used to handle actions taken by the user within the triage canvas e.g. a user clicking on a "book appointment" CTA. The url will pont to the correct endpoint in your app to handle the relevant action.

> Note: The following CTAs may be covered by the callback URL depending on your integration contract:
> `book-consultation`, `close-screen`, `open-url`, `phone`, and `find-nearby` of types [ `emergency-room`, `hospital`,` pharmacy`, `urgent-care` ]

## Handling Callbacks

To handle callback we need to setup a listener for a change in the location using `Linking` component from the `react-native` library.

```
Linking.addEventListener('url', handleTriageCtaCallback)
```

### handleTriageCtaCallback Function

On a change in the callback `url` we want the listener tp handle the actions passed through. For example if the callback url passed has the action `phone` and a `number` to call. we would want the app to place phone call with the phone number that was passed.

```
const handleTriageCtaCallback = (event: { url: string }) => {
   const { url } = event;

    const { action } = parseActionFromURL(url);

    switch (action.type) {
      case 'close-screen':
        navigate('Home');
        break;
      case 'phone':
        callNumber(action.data.number)
        break;
      default:
         break;
```

> full snipped [here](App.tsx)

1. Above we decoded the callback url which gets sent back from the Triage Canvas and has both the action and data encoded in it.
2. To handle the action we have put it through a switch statement and handle each one within our app depending on the action we want it to take. In certain cases we will expect data to be passed through along with the action. In the example above, the `phone` action is accompanied by the number passed through in the `data` object. We pass this through into our `callNumber` function to trigger a phone call.

### parseActionFromURL Function

This is the `parseActionFromURL` function from the `handleTriageCtaCallback` function above.

```
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
```

- `CALLBACK_URL`: this is the base of your callback url.
- This is a plug and play function which extracts the `action` which contains the `type` and `data` parameters from the callback passed to the app by Triage Canvas.
