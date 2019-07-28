import React from 'react';

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDsQmbvCJGpmrxHiCHrVUmuNchXiU8qdRQ",
    authDomain: "windsorcancerresearch.firebaseapp.com",
    databaseURL: "https://windsorcancerresearch.firebaseio.com",
    projectId: "windsorcancerresearch",
    storageBucket: "windsorcancerresearch.appspot.com",
    messagingSenderId: "111862271681",
    appId: "1:111862271681:web:30cfc6f896b01871"
};

export default class FirebaseSVC {

    static instance = null;
    propsData = {}

    constructor() {
      app.initializeApp(firebaseConfig);

      this.fieldValue = app.firestore.FieldValue;

      this.auth = app.auth();
      this.db = app.firestore();
    }

    static shared() {
        if (FirebaseSVC.instance === null) {
            FirebaseSVC.instance = new FirebaseSVC();
        }
        return this.instance;
    }

    user = uid => this.db.doc(`users/${uid}`)

    users = () => this.db.collection('users')

    getCurrentUser = () => {
      this.user(this.auth.currentUser.uid).get().then(doc => {
        if (doc.exists) {
          this.currentUser = doc.data();
        }
        console.log(this.currentUser.uid)
      })
    };

    messages = () => this.db.collection('messages')

    getMessage = id => this.db.doc(`messages/${id}`)

    projects = () => this.db.collection('projects')

    project = id => this.db.doc(`projects/${id}`)

    questions = () => this.db.collection('questions')

    question = id => this.db.doc(`questions/${id}`)

    ideas = () => this.db.collection('ideas')

    idea = id => this.db.doc(`ideas/${id}`)

    favorites = () => this.db.collection('favorites')

    favorite = id => this.db.doc(`favorites/${id}`)

    collabs = () => this.db.collection('collabs')

    collab = id => this.db.doc(`collabs/${id}`)
}
