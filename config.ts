/*
Must match the scheme defined in:
- android/app/src/main/AndroidManifest.xml
- ios/triage_sample_app/Info.plist
*/
const APP_SCHEME = 'triagecanvassample';

// Unique path, needs to be whitelisted
// const CALLBACK_URL = `${APP_SCHEME}://callback`;
const CALLBACK_URL = 'https://replace-by-higi-url.com/';

const CANVAS_LAUNCHER_URL = 'https://canvas.us.preprod.babylontech.co.uk';

export { CALLBACK_URL, CANVAS_LAUNCHER_URL };
