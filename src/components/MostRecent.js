import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'

import * as firebase from 'firebase';
import MatchItem from "./MatchItem";
import Firebase from "./FirebaseSVC";

export default class MostRecent extends Component {

    state = {
        userList: []
    }

    componentDidMount() {
      this.mounted = true
        this.getMatches()
    }

    componentWillUnmount(){
      this.mounted = false
    }

    getMatches = () => {
      this.mounted && Firebase.shared().users().get().then(query => {
        var userList = [];
        for (var doc in query.docs) {
          if (query.docs[doc].data().uid !== Firebase.shared().currentUser.uid) {
            userList.push(query.docs[doc].data());
          }
        }
        this.setState({
          userList: userList
        });
      })
        // firebase.database().ref('/users').on('value', (snapshot) => {
        //     var users = [];
        //     for (var uid in snapshot.val()) {
        //         if (uid !== firebase.auth().currentUser.uid) {
        //             users.push(snapshot.val()[uid]);
        //         }
        //     }
        //     this.setState({userList: users}, () => {
        //       console.log(this.state.userList)
        //     });
        // })
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.userList}
                    renderItem={({item}) => <MatchItem user={item} navigation={this.props.navigation} />}
                    keyExtractor={(item) => item.uid}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    listItem: {
        margin: 8
    },
})
