import {createSelector} from 'reselect';

const selectUser = state => state.user;

//createSelector bierze 2 argumenty: 
//1 to input selector, a 2-drugi to funkcja, która bierze returna inputa

export const selectCurrentUser = createSelector(
    [selectUser], 
    user => user.currentUser
);



