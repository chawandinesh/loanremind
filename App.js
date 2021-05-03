import React from 'react';
import {View, Text} from 'react-native';
import Routes from './src/routes';
import firebase from 'firebase';

export default function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyByAL2EHz4Vn53FxjZtq_SddDoLTWgH8Xo',
    authDomain: 'loanremind.firebaseapp.com',
    projectId: 'loanremind',
    storageBucket: 'loanremind.appspot.com',
    messagingSenderId: '710720100417',
    appId: '1:710720100417:web:4c4de2e8cc0a217bbc4ec0',
    measurementId: 'G-N6XQ8EWG9R',
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }
  return <Routes />;
}
