// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAK5ByjeIZjAyMXuI1LShjONM70V2m0oTc",
  authDomain: "jogo-da-memoria-f0081.firebaseapp.com",
  databaseURL: "https://jogo-da-memoria-f0081.firebaseio.com",
  projectId: "jogo-da-memoria-f0081",
  storageBucket: "jogo-da-memoria-f0081.appspot.com",
  messagingSenderId: "456400711581",
  appId: "1:456400711581:web:4fff0b45f3b1ab28e1c974",
  measurementId: "G-FSFN79E39E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().signInAnonymously().catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage)
});