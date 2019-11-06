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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; 
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email, 
                createdAt, 
                ...additionalData
            })
        }catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
    // console.log(snapShot);
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        //key bedzie unique jeśli zostawimy doc empty
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};


//chemy wziać cały zwrócony nowy snapshot i zmienić go z array na object
export const convertCollectionSnapshotToMap = (collectionsSnapshot) => {
    const transformedCollection = collectionsSnapshot.docs.map(
        docSnapshot => {
            const {title, items} = docSnapshot.data();

            return {
                //encodeURI - zawsze z renderem javascriptu. pass string i zwraca odpowieni jego format jako URL 
                routeName: encodeURI(title.toLowerCase()), 
                id: docSnapshot.id,
                title, 
                items,
            }
        }
    );
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

firebase.initializeApp(config);

//authorization
export const auth = firebase.auth();
//firestore methods
export const firestore = firebase.firestore();
//google auth 
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
