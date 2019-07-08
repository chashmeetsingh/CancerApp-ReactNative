import React, {Component} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import FavoriteItem from "./FavoriteItem";

import * as firebase from 'firebase';
import FirebaseSVC from "./FirebaseSVC";

export default class FavoritesScreen extends Component {

    state = {
        userList: []
    };

    componentDidMount() {
        this.userIds = [];
        this.getFavorites()
    }

    getFavorites() {
        firebase.database().ref('/saves/' + FirebaseSVC.shared().currentUser.uid).on('value', snapshot => {
            if (snapshot.val() !== null) {
                this.userIds = snapshot.val();
                this.getUserInfo();
            } else {
                this.setState({
                    userList: []
                })
            }
        })
    }

    getUserInfo() {
        var userData = [];
        this.userIds.forEach((uid) => {
            firebase.database().ref('/users/' + uid).once('value', snapshot => {
                userData.push(snapshot.val());
                this.setState({
                    userList: [...userData]
                })
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.userList.length > 0
                        ? <FlatList
                            data={this.state.userList}
                            renderItem={({item}) => <FavoriteItem user={item}/>}
                            keyExtractor={(item) => item.uid}
                        />
                        : <Text style={{textAlign: 'center'}}>No Favorites added.</Text>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        // alignItems: 'center',
        justifyContent: 'center'
    }
});
