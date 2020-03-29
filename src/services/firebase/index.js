import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCdx_CyhqGPoNhGbUhdgYOIxnJqHxlEI8Q',
  authDomain: 'supply-train.firebaseapp.com',
  databaseURL: 'https://supply-train.firebaseio.com',
  projectId: 'supply-train',
  storageBucket: 'supply-train.appspot.com',
  messagingSenderId: '902532755397',
  appId: '1:902532755397:web:86fc9da3077fc9e2be25ac'
};

const app = firebase.initializeApp(config);

export const firestore = app.firestore();
