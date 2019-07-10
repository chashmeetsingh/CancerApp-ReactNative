import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import CompleteDetails from "./CompleteDetails";

import {Google} from "expo"

export default class SignInScreen extends Component {

    static navigationOptions = {
        header: null
    };

    // Initialize Firebase
    firebaseConfig = {
        apiKey: "AIzaSyDsQmbvCJGpmrxHiCHrVUmuNchXiU8qdRQ",
        authDomain: "windsorcancerresearch.firebaseapp.com",
        databaseURL: "https://windsorcancerresearch.firebaseio.com",
        projectId: "windsorcancerresearch",
        storageBucket: "windsorcancerresearch.appspot.com",
        messagingSenderId: "111862271681",
        appId: "1:111862271681:web:30cfc6f896b01871"
    };

    constructor(props) {
        super(props);

        firebase.initializeApp(this.firebaseConfig);

        // Listen for authentication state to change.
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log("We are authenticated now!");

                firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
                    if (snapshot.val() !== null) {
                        for (var key in snapshot.val()) {
                            if (snapshot.val()[key] === "") {
                                this.completeDetails(snapshot.val());
                                return;
                            }
                        }
                        this.props.navigation.navigate('BottomTabNavigator');
                    } else {
                        const defaultUserProfileValues = {
                          title: "",
                          affiliation: "",
                          location: "",
                          experience: "",
                          research_fields: "",
                          website_link: "",
                          keywords: "",
                          bio: "",
                          uid: user.uid,
                          name: user.displayName
                        };
                        firebase.database().ref('/users/' + user.uid).set(defaultUserProfileValues).then(() => {
                            this.completeDetails(defaultUserProfileValues);
                        });
                    }
                })
            }

            // Do other things
        });
    }

    completeDetails = (profileData) => {
        const {navigate} = this.props.navigation;
        navigate('CompleteDetails', {profileData: profileData})
    };

    async loginWithFacebook() {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '368591937197975',
            { permissions: ['public_profile'] }
        );

        if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(token);

            // Sign in with credential from the Facebook userList.
            firebase
                .auth()
                .signInWithCredential(credential)
                .then((result) => {
                    firebase.database().ref('/users/' + result.user.uid).once('value').then((snapshot) => {
                        if (snapshot.val()) {
                            for (var key in snapshot.val()) {
                                if (snapshot.val()[key] === "") {
                                    this.completeDetails(snapshot.val());
                                    return;
                                }
                            }
                        } else {
                            const defaultUserProfileValues = {
                                title: "",
                                affiliation: "",
                                location: "",
                                experience: "",
                                research_fields: "",
                                website_link: "",
                                keywords: "",
                                bio: "",
                                uid: result.user.uid,
                                name: result.user.displayName
                            };
                            firebase.database().ref('/users/' + result.user.uid).set(defaultUserProfileValues).then(() => {
                                this.completeDetails(defaultUserProfileValues);
                            });
                        }
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    async loginWithGoogle() {
      try {
        const result = await Google.logInAsync({
          // androidClientId: "YOUR_CLIENT_ID_HERE",
          iosClientId: '111862271681-pkg69pfass94hr0lbhmcg25lua4277uc.apps.googleusercontent.com',
          scopes: ["profile", "email"],
          // behavior: 'web'
        })

        if (result.type === "success") {
          // Build Firebase credential with the Facebook access token.
          const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);

          // Sign in with credential from the Facebook userList.
          firebase
              .auth()
              .signInWithCredential(credential)
              .then((result) => {
                  firebase.database().ref('/users/' + result.user.uid).once('value').then((snapshot) => {
                      if (snapshot.val() !== null) {
                          for (var key in snapshot.val()) {
                              if (snapshot.val()[key] === "") {
                                  this.completeDetails(snapshot.val());
                                  return;
                              }
                          }
                      } else {
                          const defaultUserProfileValues = {
                              title: "",
                              affiliation: "",
                              location: "",
                              experience: "",
                              research_fields: "",
                              website_link: "",
                              keywords: "",
                              bio: "",
                              uid: result.user.uid,
                              name: result.user.displayName
                          };
                          console.log(defaultUserProfileValues, result);
                          firebase.database().ref('/users/' + result.user.uid).set(defaultUserProfileValues).then(() => {
                              this.completeDetails(defaultUserProfileValues);
                          });
                      }
                  })
              })
              .catch((error) => {
                  console.log(error);
              });
        } else {
          console.log("cancelled")
        }
      } catch (e) {
        console.log("error", e)
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
