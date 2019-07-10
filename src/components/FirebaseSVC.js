import * as firebase from 'firebase';
import React from 'react';

export default class FirebaseSVC {

    static instance = null;
    currentUser = {};

    propsData = {}

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
              photoUrl: userData.photoURL.replace("s96-c", "s256-c") + '?width=300&height=300'
          };
      });
    }

    setPropsData(data) {
      this.propsData = data
    }

}
