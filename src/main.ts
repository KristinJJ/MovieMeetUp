import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
//import Amplify from 'aws-amplify';
import { awsconfig } from './amplify-config';
//import Auth from '@aws-amplify/auth';
//import Storage from '@aws-amplify/storage';
//import 'cross-fetch/polyfill';
//import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
//import AWSConfig from './aws-exports';
/* import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js'; */

/* var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

var poolData = {
	UserPoolId: 'us-west-2_3TMUnyVDj', // Your user pool id here
	ClientId: '36c0irsvr5p4lbpkdoli72nk8p', // Your client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var attributeList = [];

var dataEmail = {
	Name: 'email',
	Value: 'zen.sorcere+cogTest@gmail.com',
};

var dataName = {
  Name: 'preferred_username',
  Value: 'CognitoTestMan'
}

var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);

attributeList.push(attributeEmail);
attributeList.push(attributeName);


//userPool.signUp('username', 'password', attributeList, null, function(
userPool.signUp('zen.sorcere+cogTest@gmail.com', 'Pass123!', attributeList, null, function(
	err: { message: any; },
	result: { user: any; }
) {
	if (err) {
		alert(err.message || JSON.stringify(err));
		return;
	}
	var cognitoUser = result.user;
	console.log('user name is ' + cognitoUser.getUsername());
}); */



//Storage.configure(awsconfig);
//Auth.configure(awsconfig);
// End Amplify Configuration

//Amplify.configure(awsconfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
