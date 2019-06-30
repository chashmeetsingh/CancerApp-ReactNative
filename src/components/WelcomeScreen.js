import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';

export default class WelcomeScreen extends Component {

    static navigationOptions = {
        header: null
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text h3 style={styles.welcomeText}>Welcome</Text>
                <Button
                    title='Sign In'
                    buttonStyle={styles.signInButton}
                    containerStyle={styles.signInButtonContainer}
                    titleStyle={styles.signInButtonTitle}
                    onPress={() => navigate('SignIn')}
                />
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
    },
    signInButton: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    signInButtonContainer: {
        width: '90%'
    },
    signInButtonTitle: {
        color: '#00BCD4'
    }
});