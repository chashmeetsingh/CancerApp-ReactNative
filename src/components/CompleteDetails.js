import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, Keyboard, Platform, View, ScrollView} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import * as firebase from 'firebase';
import ValidatorTextField from './ValidatorTextField'
import validate from './Validator'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Firebase from "./FirebaseSVC";
import { StackActions, NavigationActions } from 'react-navigation';

export default class CompleteDetails extends Component {

    static navigationOptions = {
        title: 'Complete Details'
    };

    state = {
      height: 0
    };

    componentDidMount() {
        this.setState(Firebase.shared().currentUser);
    }

    updateUserProfile = () => {

        const titleError = validate('title', this.state.title);
        const affiliationError = validate('affiliation', this.state.affiliation);
        const locationError = validate('location', this.state.location);
        const experienceError = validate('experience', this.state.experience);
        const researchFieldsError = validate('research_fields', this.state.research_fields);
        const websiteLinkError = validate('website_link', this.state.website_link);
        const keywordsError = validate('keywords', this.state.keywords);
        const bioError = validate('bio', this.state.bio);

        this.setState({
            titleError: titleError,
            affiliationError: affiliationError,
            locationError: locationError,
            experienceError: experienceError,
            researchFieldsError: researchFieldsError,
            websiteLinkError: websiteLinkError,
            keywordsError: keywordsError,
            bioError: bioError
        });

        if (!titleError &&
            !affiliationError &&
            !locationError &&
            !experienceError &&
            !researchFieldsError &&
            !websiteLinkError &&
            !keywordsError &&
            !bioError) {
            // console.log('passed validation');

            Firebase.shared().user(this.state.uid).set({
              title: this.state.title,
              affiliation: this.state.affiliation,
              location: this.state.location,
              experience: this.state.experience,
              research_fields: this.state.research_fields,
              website_link: this.state.website_link,
              keywords: this.state.keywords,
              bio: this.state.bio,
            }, {
              merge: true
            }).then(() => {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'BottomTabNavigator' })],
              });
              this.props.navigation.dispatch(resetAction);
            })
        }
    };

    render() {
        return (
            <KeyboardAwareScrollView>
                <ValidatorTextField
                    placeholder='Title'
                    onChangeText={(title) => this.setState({title: title})}
                    value={this.state.title}
                    error={this.state.titleError}
                />
                <ValidatorTextField
                    placeholder='Affiliation'
                    onChangeText={(affiliation) => this.setState({affiliation: affiliation})}
                    value={this.state.affiliation}
                    error={this.state.affiliationError}
                />
                <ValidatorTextField
                    placeholder='Location'
                    onChangeText={(location) => this.setState({location: location})}
                    value={this.state.location}
                    error={this.state.locationError}
                />
                <ValidatorTextField
                    placeholder='Experience'
                    onChangeText={(experience) => this.setState({experience: experience})}
                    value={this.state.experience}
                    error={this.state.experienceError}
                />
                <ValidatorTextField
                    placeholder='Research Fields'
                    onChangeText={(research_fields) => this.setState({research_fields: research_fields})}
                    value={this.state.research_fields}
                    error={this.state.researchFieldsError}
                />
                <ValidatorTextField
                    placeholder='Website Link'
                    onChangeText={(website_link) => this.setState({website_link: website_link.toLowerCase()})}
                    value={this.state.website_link}
                    error={this.state.websiteLinkError}
                />
                <ValidatorTextField
                    placeholder='Keywords'
                    onChangeText={(keywords) => this.setState({keywords: keywords})}
                    value={this.state.keywords}
                    error={this.state.keywordsError}
                />
                <View>
                  <Input
                      placeholder='Bio'
                      value={this.state.bio}
                      multiline={true}
                      onChangeText={(bio) => this.setState({bio: bio})}
                      inputContainerStyle={{borderWidth: 0.5, borderColor: '#BDBDBD', borderRadius: 10, backgroundColor: 'white'}}
                      inputStyle={{color: 'black', fontSize: 14, height: Math.max(50, this.state.height), marginLeft: 8, marginRight: 8, marginTop: 4, marginBottom: 4}}
                      autoCompleteType='off'
                      onContentSizeChange={(event) => {
                          this.setState({ height: event.nativeEvent.contentSize.height + 4 })
                      }}
                      containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
                      blurOnSubmit={true}
                      returnKeyType={"done"}
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
                  />
                  {
                      this.state.bioError &&
                      <Text style={{color: 'red', fontSize: 12, marginLeft: 16, }}>{this.state.bioError}</Text>
                  }
                </View>
                <Button
                    title='Update Profile'
                    buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10, marginLeft: 16, marginRight: 16, marginTop: 8}}
                    containerStyle={{marginBottom: 16, flex: 1}}
                    titleStyle={{color: 'white'}}
                    onPress={() => this.updateUserProfile()}
                />
            </KeyboardAwareScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        // alignItems: 'center',
        flex: 1,
        marginTop: 10,
    }
});
