import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from 'aws-amplify';
import { awsconfig } from './amplify-config';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
//import AWSConfig from './aws-exports';

Storage.configure(awsconfig);
Auth.configure(awsconfig);
// End Amplify Configuration

Amplify.configure(awsconfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
