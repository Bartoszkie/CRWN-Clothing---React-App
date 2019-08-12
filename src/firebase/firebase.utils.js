import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCRM3RIVwDFBbyn4S1guy4TvEFEUfplrto",
    authDomain: "crwn-db-7f10a.firebaseapp.com",
    databaseURL: "https://crwn-db-7f10a.firebaseio.com",
    projectId: "crwn-db-7f10a",
    storageBucket: "",
    messagingSenderId: "198450480049",
    appId: "1:198450480049:web:766673e8960a9a85"
};

firebase.initializeApp(config);

//authorization
export const auth = firebase.auth();
//firestore methods
export const firestore = firebase.firestore();
//google auth 
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
