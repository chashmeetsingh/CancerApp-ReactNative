import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import * as firebase from 'firebase';

export default class CompleteDetails extends Component {

    static navigationOptions = {
        title: 'Complete Details'
    };

    state = {};

    componentDidMount() {
        this.setState(this.props.navigation.getParam('profileData', {}));
    }

    updateUserProfile = () => {
        firebase.database().ref('/users/' + this.state.uid).set(this.state).then(() => {
            this.props.navigation.navigate('BottomTabNavigator');
        });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container} keyboardVerticalOffset={40}>
                <Input
                    placeholder='Title'
                    inputContainerStyle={{borderWidth: 0.5, borderColor: '#BDBDBD', borderRadius: 10}}
                    containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
                    inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14, height: 20}}
                    autoCompleteType='off'
                    onChangeText={(title) => this.setState({title: title}, () => {
                        console.log(this.state)
                    })}
                    value={this.state.title}
                />
                <Input
                    placeholder='Affiliation'
                    inputContainerStyle={{borderWidth: 0.5, borderColor: '#BDBDBD', borderRadius: 10}}
                    containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
                    inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
                    autoCompleteType='off'
                    onChangeText={(affiliation) => this.setState({affiliation: affiliation})}
                    value={this.state.affiliation}
                />
                <Input
                    placeholder='Location'
                    inputContainerStyle={{borderWidth: 0.5, borderColor: '#BDBDBD', borderRadius: 10}}
                    containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
                    inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
                    autoCompleteType='off'
                    onChangeText={(location) => this.setState({location: location})}
                    value={this.state.location}
                />
                <Input
                    placeholder='Experience'
                    inputContainerStyle={{borderWidth: 0.5, borderColor: '#BDBDBD', borderRadius: 10}}
                    containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
                    inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
                    autoCompleteType='off'
                    onChangeText={(experience) => this.setState({experience: experience})}
                    value={this.state.experience}
                />
                <Input
                    placeholder='Research Fields'
                    inputContainerStyle={{borderWidth: 0.5, borderColor: '#BDBDBD', borderRadius: 10}}
                    containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
                    inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
                    autoCompleteType='off'
                    onChangeText={(research_fields) => this.setState({research_fields: research_fields})}
                    value={this.state.research_fields}
                />
                <Input
                    placeholder='Website Link'
                    inputContainerStyle={{borderWidth: 0.5, borderColor: '#BDBDBD', borderRadius: 10}}
                    containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
                    inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
                    autoCompleteType='off'
                    onChangeText={(website_link) => this.setState({website_link: website_link})}
                    value={this.state.website_link}
                />
                <Input
                    placeholder='Keywords'
                    inputContainerStyle={{borderWidth: 0.3, borderColor: '#BDBDBD', borderRadius: 10}}
                    containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
                    inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
                    autoCompleteType='off'
                    onChangeText={(keywords) => this.setState({keywords: keywords})}
                    value={this.state.keywords}
                />
                <Input
                    placeholder='Bio'
                    inputContainerStyle={{borderWidth: 0.3, borderColor: '#BDBDBD', borderRadius: 10}}
                    containerStyle={{margin: 4, marginBottom: 10}}
                    inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
                    autoCompleteType='off'
                    onChangeText={(bio) => this.setState({bio: bio})}
                    value={this.state.bio}
                />
                <Button
                    title='Update Profile'
                    buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10, marginLeft: 10}}
                    containerStyle={{alignItems: 'center', justifyContent: 'center'}}
                    titleStyle={{color: 'white'}}
                    multiline={true}
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