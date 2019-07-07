import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import FirebaseSVC from "./FirebaseSVC";

export default class ProfileScreen extends Component {

    state = {
        user: {}
    };

    async componentDidMount() {
        this.currentUser = FirebaseSVC.shared().currentUser;
        this.setState({
            user: this.currentUser
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png'}}
                    />
                    <Button
                        title='My Collabs'
                        buttonStyle={{backgroundColor: 'white', borderRadius: 10, margin: 10}}
                        containerStyle={{alignItems: 'center', justifyContent: 'center'}}
                        titleStyle={{color: '#00BCD4'}}
                        // onPress={() => this.updateUserProfile()}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#00BCD4',
        flexDirection: 'column',
    },
    profileImage: {
        width: Dimensions.get('window').width / 2.5,
        height: Dimensions.get('window').width / 2.5,
        borderRadius: Dimensions.get('window').width / 5,
        backgroundColor: 'gray'
    },
    profileDataContainer: {
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
