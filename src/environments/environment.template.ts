// Use this file as a template for your environment.ts file
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  imdbApiKey: /*YOUR-IMDB-API-KEY-HERE*/, //insert your own IMDb-API key from https://imdb-api.com/
  demoUserID: "DEMO",
  loginURL: "http://localhost:4200/home",
  logoutURL: "http://localhost:4200/intro"
};
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
