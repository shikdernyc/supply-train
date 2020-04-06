import * as firebase from 'firebase/app';
import 'firebase/firestore';

// TODO: PUT IT IN A CREDENTIAL/SECRET FOLDER
const config = {
  apiKey: 'abc123',
  authDomain: 'abc123',
  databaseURL: 'abc123',
  projectId: 'abc123',
  storageBucket: 'abc123',
  messagingSenderId: 'abc132',
  appId: 'abc123'
};

const app = firebase.initializeApp(config);

export const firestore = app.firestore();
,