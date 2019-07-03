import React, {Component} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import MessageItem from "./MessageItem";

import * as firebase from 'firebase';
import FirebaseSVC from "./FirebaseSVC";

export default class MessageScreen extends Component {

    static navigationOptions = {
        headerTitle: 'Messaging'
    };

    state = {
        userUids: [],
        userList: [],
        messageIds: []
    };

    componentDidMount() {
      this.mounted = true
      this.getUserList()

      this.propsReceived = this.props.navigation.addListener('willFocus', () => {
        if (FirebaseSVC.shared().propsData !== null) {
          this.openChatIfIdExists();
        }
      })

    }

    componentWillUnmount() {
      this.mounted = false
      this.propsReceived.remove()
    }

    openChatIfIdExists() {
      var {user, mid} = FirebaseSVC.shared().propsData;

      if (user && mid) {
        var user = user;
        user['messageKey'] = mid;

        this.props.navigation.navigate('MessageDetailView', {user: user})
        FirebaseSVC.shared().setPropsData(null);
      }
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
            this.setState({userUids: uids, messageIds: messageIds}, () => {
              if(this.state.userUids.length > 0) {
                this.getUserInfo()
              } else {
                this.setState({
                  userList: []
                })
              }
            });
        })
    };

    getUserInfo = () => {
        var userList = [];
        this.state.userUids.map((uid, index) => {
            firebase.database().ref('/users/' + uid).once('value', (snapshot) => {
                let val = snapshot.val();
                val['messageKey'] = this.state.messageIds[index];
                userList.push(val)
            });
            this.setState({
                userList: [...userList]
            })
        });
    };

    render() {
        return (
          <View style={styles.container}>
              {
                this.state.userList.length > 0
                ?

                  <FlatList
                      data={this.state.userList}
                      renderItem={({item}) => <MessageItem user={item} navigation={this.props.navigation}/>}
                      keyExtractor={(item) => item.uid}
                  />

                :
                <View style={styles.noMessageContainer}>
                  <Text>No messages found.</Text>
                </View>
              }
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    noMessageContainer: {
      flex: 1,
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center'
    }
});
