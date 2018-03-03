import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDG9CDTPG9Xy9RcxcG-8EszO1Wughk0WLg",
  authDomain: "project-blue-bad22.firebaseapp.com",
  databaseURL: "https://project-blue-bad22.firebaseio.com",
  projectId: "project-blue-bad22",
  storageBucket: "project-blue-bad22.appspot.com",
  messagingSenderId: "493800653303"
};
firebase.initializeApp(config);

export default firebase;
