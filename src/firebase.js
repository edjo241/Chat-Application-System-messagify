import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCMhSQbWKkOnHnEdP_4GBjjEJnZpn66wLk",
    authDomain: "messagify-c1cc5.firebaseapp.com",
    projectId: "messagify-c1cc5",
    storageBucket: "messagify-c1cc5.appspot.com",
    messagingSenderId: "443222605673",
    appId: "1:443222605673:web:6b2ec8c430099dfe2387f8",
    measurementId: "G-ERKZ5HM606"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
