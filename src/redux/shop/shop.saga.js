import { takeLatest, call, put } from "redux-saga/effects";
//takeEvery - listen to every action to a specific type that we pass to it
//takeEvery robi nam non-blocking code aby nie blokować pozostałych sagów

//call - wywołuje nam podawaną w pierwszym parametrze funkcję a jako drugi parametr bierze "oryginalny" parametr funckji podawanej w pierwszym argunemcie
//put - sagas nie dispatchują akcji. Odpowiednikiem dispatcha w redux-saga jest put, który jest effectem który tworzy akcje

import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionSnapshotToMap
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shop.actions";

export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}
