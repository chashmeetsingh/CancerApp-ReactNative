import React, {Component} from 'react'
import {Text, View, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native'
import {Input, Button} from 'react-native-elements'

import FirebaseSVC from "./FirebaseSVC";
import ValidatorTextField from './ValidatorTextField'
import validate from './Validator'
import * as firebase from 'firebase';

export default class UserProfile extends Component {

  state = {
        user: {},
        editingEnabled: false,
        label: 'Edit Profile'
    };

  async componentDidMount() {
        this.currentUser = FirebaseSVC.shared().currentUser;

        this.setState({
            user: this.currentUser
        })
    }

  toogleProfileEdit() {
    if (this.state.editingEnabled) {

      const titleError = validate('title', this.state.user.title);
      const affiliationError = validate('affiliation', this.state.user.affiliation);
      const locationError = validate('location', this.state.user.location);
      const experienceError = validate('experience', this.state.user.experience);
      const researchFieldsError = validate('research_fields', this.state.user.research_fields);
      const websiteLinkError = validate('website_link', this.state.user.website_link);
      const keywordsError = validate('keywords', this.state.user.keywords);
      const bioError = validate('bio', this.state.user.bio);

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

      if (titleError ||
          affiliationError ||
          locationError ||
          experienceError ||
          researchFieldsError ||
          websiteLinkError ||
          keywordsError ||
          bioError) {
            return;
      }

      this.setState({
        editingEnabled: false,
        label: 'Edit Profile'
      }, () => {
        firebase.database().ref('/users/' + this.currentUser.uid).set(this.state.user);
      });
    } else {
      this.setState({
        editingEnabled: true,
        label: 'Save Profile'
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={40}>
      <ScrollView style={styles.profileDataContainer}>
        <ValidatorTextField
              placeholder='Title'
              value={this.state.user.title}
              editable={this.state.editingEnabled}
              onChangeText={
                (title) => this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    title: title
                  }
                }))
              }
              error={this.state.titleError}
          />
          <ValidatorTextField
              placeholder='Affiliation'
              value={this.state.user.affiliation}
              editable={this.state.editingEnabled}
              onChangeText={
                (affiliation) => this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    affiliation: affiliation
                  }
                }))
              }
              error={this.state.affiliationError}
          />
          <ValidatorTextField
              placeholder='Location'
              value={this.state.user.location}
              editable={this.state.editingEnabled}
              onChangeText={
                (location) => this.setState(prevState => ({
                  user: {
                    ...prevState.location,
                    location: location
                  }
                }))
              }
              error={this.state.locationError}
          />
          <ValidatorTextField
              placeholder='Experience'
              value={this.state.user.experience}
              editable={this.state.editingEnabled}
              onChangeText={
                (experience) => this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    experience: experience
                  }
                }))
              }
              error={this.state.experienceError}
          />
          <ValidatorTextField
              placeholder='Research Fields'
              value={this.state.user.research_fields}
              editable={this.state.editingEnabled}
              onChangeText={
                (research_fields) => this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    research_fields: research_fields
                  }
                }))
              }
              error={this.state.researchFieldsError}
          />
          <ValidatorTextField
              placeholder='Website Link'
              value={this.state.user.website_link}
              editable={this.state.editingEnabled}
              onChangeText={
                (website_link) => this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    website_link: website_link.toLowerCase()
                  }
                }))
              }
              error={this.state.websiteLinkError}
          />
          <ValidatorTextField
              placeholder='Keywords'
              value={this.state.user.keywords}
              editable={this.state.editingEnabled}
              onChangeText={
                (keywords) => this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    keywords: keywords
                  }
                }))
              }
              error={this.state.keywordsError}
          />
          <ValidatorTextField
              placeholder='Bio'
              value={this.state.user.bio}
              editable={this.state.editingEnabled}
              multiline={true}
              onChangeText={
                (bio) => this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    bio: bio
                  }
                }))
              }
              error={this.state.bioError}
          />
        <View>
          <Button
              title={this.state.label}
              buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10, marginLeft: 16, marginRight: 16, marginTop: 10}}
              containerStyle={{marginBottom: 16, flex: 1}}
              titleStyle={{color: 'white'}}
              onPress={() => this.toogleProfileEdit()}
          />
        </View>

      </ScrollView>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  profileDataContainer: {
      paddingTop: 4,
      backgroundColor: '#eee'
  }
})
