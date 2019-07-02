import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MessageItem from "./MessageItem";

import * as firebase from 'firebase';

export default class MatchesView extends Component {

    static navigationOptions = {
        title: 'Messaging',
        headerTitle: 'Messaging',
        tabBarLabel: 'Messaging'
    };

    state = {
        userUids: [],
        userList: [],
        messageIds: []
    };

    componentDidMount() {
        this.getUserList()
    }

    getUserList = () => {
        firebase.database().ref('/messages').on('value', (snapshot) => {
            var uids = [];
            var messageIds = [];
            for (var key in snapshot.val()) {
                if (key.includes(firebase.auth().currentUser.uid) && !messageIds.includes(key)) {
                    var uidList = key.split(',');
                    var otherUserId = uidList[0] != firebase.auth().currentUser.uid ? uidList[0] : uidList[1];
                    if (!uids.includes(otherUserId)) {
                        uids.push(otherUserId);
                        messageIds.push(key);
                    }
                }
            }
            // console.log(uids);
            this.setState({userUids: uids, messageIds: messageIds}, () => {
                this.getUserInfo()
            });
        })
    };

    getUserInfo = () => {
        this.state.userUids.map((uid, index) => {
            firebase.database().ref('/users/' + uid).once('value', (snapshot) => {
                let val = snapshot.val();
                val['messageKey'] = this.state.messageIds[index];
                if (!this.state.userList.includes(val)) {
                    this.setState({
                        userList: [...this.state.userList, val]
                    })
                }
            })
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.userList}
                    renderItem={({item}) => <MessageItem user={item} navigation={this.props.navigation}/>}
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
    }
});