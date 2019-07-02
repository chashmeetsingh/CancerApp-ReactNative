import * as firebase from 'firebase';
import React from 'react';

export default class FirebaseSVC {

    static instance = null;
    currentUser = {};

    constructor() {
        this.getCurrentUser()
    }

    static shared() {
        if (FirebaseSVC.instance === null) {
            FirebaseSVC.instance = new FirebaseSVC();
        }
        return this.instance;
    }

    getCurrentUser() {
        let userData = firebase.auth().currentUser;
        firebase.database().ref('/users/' + userData.uid).once('value', snapshot => {
            this.currentUser = {
                ...snapshot.val(),
                name: userData.displayName,
                photoUrl: userData.photoURL
            };
        });
    }

}