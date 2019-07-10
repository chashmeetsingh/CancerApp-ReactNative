import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import * as firebase from 'firebase';
import ValidatorTextField from './ValidatorTextField'
import validate from './Validator'

export default class CompleteDetails extends Component {

    static navigationOptions = {
        title: 'Complete Details'
    };

    state = {};

    componentDidMount() {
        this.setState(this.props.navigation.getParam('profileData', {}));
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
            firebase.database().ref('/users/' + this.state.uid).set(this.state).then(() => {
                this.props.navigation.navigate('BottomTabNavigator');
            });
      }


    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container} keyboardVerticalOffset={40}>
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
                <ValidatorTextField
                    placeholder='Bio'
                    onChangeText={(bio) => this.setState({bio: bio})}
                    value={this.state.bio}
                    multiline={true}
                    error={this.state.bioError}
                />
                <Button
                    title='Update Profile'
                    buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10, marginLeft: 10}}
                    containerStyle={{alignItems: 'center', justifyContent: 'center'}}
                    titleStyle={{color: 'white'}}
                    onPress={() => this.updateUserProfile()}
                />
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        marginTop: 10,
    }
});
