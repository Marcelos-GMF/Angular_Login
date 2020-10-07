// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Configuração no Firebase do Projeto: "Projeto-Firebase-Web"	

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCQMfNhrDLoKwXaHffYQpb07IjVm1bigek",
    authDomain: "projeto-firebase-web.firebaseapp.com",
    databaseURL: "https://projeto-firebase-web.firebaseio.com",
    projectId: "projeto-firebase-web",
    storageBucket: "projeto-firebase-web.appspot.com",
    messagingSenderId: "1068670305034",
    appId: "1:1068670305034:web:4eaa9bf75ef848a73d70f3"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
