import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Text } from 'react-native-elements';
import SignInScreen from './SignInScreen'

export default class WelcomeScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
      super(props);

      this.state = {
        firstLaunch: null
      };
    }

    componentDidMount() {
      AsyncStorage.getItem('alreadyLaunched').then(value => {
        if (value === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true');
        } else {
          this.setState({firstLaunch: false})
        }
      })
    }

    render() {
      if (this.state.firstLaunch == true || this.state.firstLaunch == null) {
        return (<View style={styles.container}>
            <Text h3 style={styles.welcomeText}>Welcome</Text>
            <Button
                title='Sign In'
                buttonStyle={styles.signInButton}
                containerStyle={styles.signInButtonContainer}
                titleStyle={styles.signInButtonTitle}
                onPress={() => this.props.navigation.navigate('SignIn')}
            />
        </View>)
      } else {
        return <SignInScreen navigation={this.props.navigation} />
      }
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
