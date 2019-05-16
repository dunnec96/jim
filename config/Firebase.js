import * as firebase from 'firebase'

var config = {
    apiKey: "<AIzaSyAvPpzlPYk7dNB-ijJvpghJjsyVsm5AETg>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://entertainmentrepublic-f0c4e.firebaseio.com/",
    projectId: "<entertainmentrepublic-f0c4e>",
    
  };

  firebase.initializeApp(config);

  export default firebase