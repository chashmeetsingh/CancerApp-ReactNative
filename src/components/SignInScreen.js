import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import CompleteDetails from "./CompleteDetails";

import {Google} from "expo"

import Firebase from "./FirebaseSVC";
import { StackActions, NavigationActions } from 'react-navigation';

export default class SignInScreen extends Component {

    static navigationOptions = {
        header: null
    };

    // // Initialize Firebase
    // firebaseConfig = {
    //     apiKey: "AIzaSyDsQmbvCJGpmrxHiCHrVUmuNchXiU8qdRQ",
    //     authDomain: "windsorcancerresearch.firebaseapp.com",
    //     databaseURL: "https://windsorcancerresearch.firebaseio.com",
    //     projectId: "windsorcancerresearch",
    //     storageBucket: "windsorcancerresearch.appspot.com",
    //     messagingSenderId: "111862271681",
    //     appId: "1:111862271681:web:30cfc6f896b01871"
    // };

    state = {
      user: {
        title: "",
        affiliation: "",
        location: "",
        experience: "",
        research_fields: "",
        website_link: "",
        keywords: "",
        bio: ""
      }
    };

    componentDidMount(){
      this.mounted = true

      // Listen for authentication state change
      this.mounted && Firebase.shared().auth.onAuthStateChanged((user) => {
        if (user != null) {
          console.log("Authentication success!");
          this.completeSignIn(user);
        }
      })
    }

    componentWillUnmount(){
      this.mounted = false
    }

    completeSignIn(user) {
      this.mounted && Firebase.shared().getCurrentUser();
      console.log('User ID: ', user.uid);

      this.mounted && Firebase.shared().user(user.uid).get().then(doc => {
        if (doc.exists) {
          this.setState({
            user: doc.data()
          }, () => {
            for (var key in this.state.user) {
              if (this.state.user[key] === "") {
                this.completeDetails();
                return;
              }
            }
            Firebase.shared().getCurrentUser();
            this.openHomeView()
          });
        } else {
          console.log('User doesn\'t exist');
          this.mounted && Firebase.shared().user(user.uid).set({
            title: this.state.user.title,
            affiliation: this.state.user.affiliation,
            location: this.state.user.location,
            experience: this.state.user.experience,
            research_fields: this.state.user.research_fields,
            website_link: this.state.user.website_link,
            keywords: this.state.user.keywords,
            bio: this.state.user.bio,
            uid: user.uid,
            name: user.displayName,
            photoURL: user.photoURL.replace("s96-c", "s256-c") + '?width=300&height=300',
            visits: 0
          }, {
            merge: true
          }).then(() => {
              for (var key in this.state.user) {
                  if (this.state.user[key] === "") {
                      this.completeDetails();
                      return;
                  }
              }
              this.openHomeView();
          })
        }
      })
    }

    openHomeView() {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'BottomTabNavigator' })],
      });
      this.props.navigation.dispatch(resetAction);
    }

    constructor(props) {
        super(props);

        // firebase.initializeApp(this.firebaseConfig);
        //
        // // Listen for authentication state to change.
        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user != null) {
        //         console.log("We are authenticated now!");
        //
        //         firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
        //             if (snapshot.val() !== null) {
        //                 for (var key in snapshot.val()) {
        //                     if (snapshot.val()[key] === "") {
        //                         this.completeDetails(snapshot.val());
        //                         return;
        //                     }
        //                 }
        //                 this.props.navigation.navigate('BottomTabNavigator');
        //             } else {
        //                 const defaultUserProfileValues = {
                            // title: "",
                            // affiliation: "",
                            // location: "",
                            // experience: "",
                            // research_fields: "",
                            // website_link: "",
                            // keywords: "",
                            // bio: "",
                            // uid: user.uid,
                            // name: user.displayName
        //                 };
        //                 firebase.database().ref('/users/' + user.uid).set(defaultUserProfileValues).then(() => {
        //                     this.completeDetails(defaultUserProfileValues);
        //                 });
        //             }
        //         })
        //     }
        //
        //     // Do other things
        // });
    }

    completeDetails = () => {
        this.props.navigation.navigate('CompleteDetails')
    };

    async loginWithFacebook() {
        const { type, token } = this.mounted && await Facebook.logInWithReadPermissionsAsync(
            '368591937197975',
            { permissions: ['public_profile'] }
        );

        if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = this.mounted && firebase.auth.FacebookAuthProvider.credential(token);

            // Sign in with credential from the Facebook userList.
            this.mounted && firebase
                .auth()
                .signInWithCredential(credential)
                .then((result) => {
                  this.completeSignIn(result.user);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    async loginWithGoogle() {
      const result = this.mounted && await Google.logInAsync({
          // androidClientId: "YOUR_CLIENT_ID_HERE",
          iosClientId: '111862271681-pkg69pfass94hr0lbhmcg25lua4277uc.apps.googleusercontent.com',
          scopes: ["profile", "email"],
          // behavior: 'web'
      })

      if (result.type === "success") {
          // Build Firebase credential with the Facebook access token.
          const credential = this.mounted && firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);

          // Sign in with credential from the Facebook userList.
          this.mounted && firebase
              .auth()
              .signInWithCredential(credential)
              .then((result) => {
                this.completeSignIn(result.user);
              })
              .catch((error) => {
                  console.log(error);
              });
      }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text h3 style={styles.welcomeText}>Sign In</Text>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} enabled>
                    <Input
                        placeholder='Email Address'
                        leftIcon={
                            <Icon name='envelope' size={24} color='white' />
                        }
                        inputContainerStyle={{borderWidth: 1, borderColor: 'white', borderRadius: 10}}
                        containerStyle={{width: '95%', alignItems: 'center', justifyContent: 'center', margin: 10}}
                        inputStyle={{color: 'white', paddingLeft: 8, }}
                        keyboardType='email-address'
                        autoCompleteType='off'
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={
                            <Icon name='key' size={24} color='white' />
                        }
                        inputContainerStyle={{borderWidth: 1, borderColor: 'white', borderRadius: 10}}
                        containerStyle={{width: '95%', alignItems: 'center', justifyContent: 'center', margin: 10}}
                        inputStyle={{color: 'white', paddingLeft: 8, }}
                        autoCompleteType='off'
                        secureTextEntry={true}
                    />
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Button
                            title='Sign In'
                            buttonStyle={{backgroundColor: 'white', borderRadius: 10}}
                            containerStyle={{width: '90%'}}
                            titleStyle={{color: '#00BCD4'}}
                        />
                        <Button
                            icon={
                                <Icon
                                    name="google"
                                    size={20}
                                    color="white"
                                />
                            }
                            onPress={() => this.loginWithGoogle()}
                            title='Continue with Google'
                            buttonStyle={{backgroundColor: '#dc4e41', borderRadius: 10, alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 20}}
                            containerStyle={{width: '90%', margin: 10}}
                            titleStyle={{color: 'white', marginLeft: 10}}
                        />
                        <Button
                            icon={
                                <Icon
                                    name="facebook"
                                    size={20}
                                    color="white"
                                />
                            }
                            onPress={() => this.loginWithFacebook()}
                            title='Continue with Facebook'
                            buttonStyle={{backgroundColor: '#273C92', borderRadius: 10, alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 20}}
                            containerStyle={{width: '90%', marginBottom: 10}}
                            titleStyle={{color: 'white', marginLeft: 10}}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00BCD4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeText: {
        color: 'white',
        marginBottom: 8
    }
});
