import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MessageItem from "./MessageItem";

import Firebase from "./FirebaseSVC";

export default class MessageScreen extends Component {

    static navigationOptions = {
        headerTitle: 'Messaging'
    };

    state = {
        userUids: [],
        userList: [],
        messageIds: [],
        conversations: []
    };

    componentDidMount() {
        this.mounted = true
        this.getUserList()

        this.propsReceived = this.props.navigation.addListener('willFocus', () => {
            if (Firebase.shared().propsData !== null) {
                this.openChatIfIdExists();
            }
        })
    }

    componentWillUnmount() {
        this.mounted = false
        this.propsReceived()
    }

    openChatIfIdExists() {
        var uid = Firebase.shared().propsData.user;
        var mid = Firebase.shared().propsData.mid;

        if (uid && mid) {
          Firebase.shared().user(uid).get().then(doc => {
            if (doc.exists) {
              var user = doc.data()
            }

            Firebase.shared().getMessage(mid).get().then(doc => {
              var conversation = {};
              if (doc.exists) {
                conversation = doc.data();
              } else {
                conversation = {
                  createdAt: Date.now(),
                  createdBy: Firebase.shared().currentUser.uid,
                  member: uid,
                  status: 'waiting',
                  updatedAt: Date.now()
                };
                Firebase
                .shared()
                .getMessage(mid)
                .set(conversation)
              }
              this.props.navigation.navigate('MessageDetailView', {user: user, conversation: doc.data()})
              Firebase.shared().propsData = null
            })
          })
        }
    }

    getUserList = () => {
      this.setState({
        conversations: []
      });
      this.mounted && Firebase.shared().messages().where("createdBy", "==", Firebase.shared().currentUser.uid).onSnapshot(query => {
        query.docChanges().forEach(change => {
          if (change.type === 'added') {
            this.setState({conversations: []});
            for (var doc in query.docs) {
              let data = query.docs[doc].data();
              data['key'] = query.docs[doc].id;
              this.setState(prevState => ({
                conversations: [...prevState.conversations, data]
              }));
            }
          }
        });


        this.mounted && Firebase.shared().messages().where("member", "==", Firebase.shared().currentUser.uid).onSnapshot(query => {
          query.docChanges().forEach(change => {
            if (change.type === 'added') {
              for (var doc in query.docs) {
                let data = query.docs[doc].data();
                data['key'] = query.docs[doc].id;
                this.setState(prevState => ({
                  conversations: [...prevState.conversations, data]
                }));
              }
            }
          });
        })
      })
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.conversations.length > 0
                        ?
                        <FlatList
                            data={this.state.conversations}
                            renderItem={({item}) => <MessageItem conversation={item} navigation={this.props.navigation}/>}
                            keyExtractor={(item) => item.key}
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
