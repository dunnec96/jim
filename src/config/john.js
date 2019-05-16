import Firebase from 'firebase'
let config = {
    apiKey: "AIzaSyAvPpzlPYk7dNB-ijJvpghJjsyVsm5AETg",
    authDomain: "entertainmentrepublic-f0c4e.firebaseapp.com",
    databaseURL: "https://entertainmentrepublic-f0c4e.firebaseio.com",
    projectId: "entertainmentrepublic-f0c4e",
    storageBucket: "entertainmentrepublic-f0c4e.appspot.com",
    messagingSenderId: "436326701914"
  };
 let app = Firebase.initializeApp(config);
 export const db = app.database();