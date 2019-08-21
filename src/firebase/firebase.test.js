import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

//przykład jak queryjemy w firebase 
firestore.collection('users').doc('HPo4fDVXLEAPpTpWuHqi').collection('cartItems').doc('RXdjcLnD7YL3cuiY1zw7');
