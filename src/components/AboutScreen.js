import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProfileScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.versionDetails}>Version: 1.0.0</Text>
                <Text style={styles.description}>This app was created by a team of five University of Windsor undergraduates including Nevin Pota, Asma Ghafoor, Mckenzie Cervini, Joana Baku, and Tanya Vir.
                    The aim is to create an easy and accessible space to allow researchers and healthcare professionals to connect and collaborate
                    on ideas that would help in finding and creating new advances for the medical field.</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        width: '100%',
        height: '100%',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    versionDetails: {
        marginTop: 20,
        fontSize: 18
    },
    description: {
        marginTop: 20,
        marginLeft: 32,
        marginRight: 32,
        textAlign: 'center',
        fontSize: 17,
        lineHeight: 25
    }
});
