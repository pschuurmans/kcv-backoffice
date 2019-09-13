// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBdwA0GenCWF_xNu6BVCAqx7gH24tzMMkk',
    authDomain: 'dev-kcv-backoffice.firebaseapp.com',
    databaseURL: 'https://dev-kcv-backoffice.firebaseio.com',
    projectId: 'dev-kcv-backoffice',
    storageBucket: 'dev-kcv-backoffice.appspot.com',
    messagingSenderId: '24850615386',
    appId: '1:24850615386:web:ceba1a50f71547c1'
  },
  sentry_dsn: 'https://b94a7e27739e4b4c8e8b231823596a17@sentry.io/1726489'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
