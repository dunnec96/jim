import React, { Component } from 'react';
import FirebaseLogin from "./FirebaseLogin";
// import firebase from 'firebase'
// import { Root, Tabs } from './src/config/router';
import Router from './src/config/router'
import config from './src/config/john.js'

  // Initialize Firebase
//   let config = {
//     apiKey: "AIzaSyAvPpzlPYk7dNB-ijJvpghJjsyVsm5AETg",
//     authDomain: "entertainmentrepublic-f0c4e.firebaseapp.com",
//     databaseURL: "https://entertainmentrepublic-f0c4e.firebaseio.com",
//     projectId: "entertainmentrepublic-f0c4e",
//     storageBucket: "entertainmentrepublic-f0c4e.appspot.com",
//     messagingSenderId: "436326701914"
//   };
//  let app = firebase.initializeApp(config);
//  export const db = app.database();



class App extends Component {
  render() {
    return (
    
     <Router/>
    )
  }
}

export default App;
