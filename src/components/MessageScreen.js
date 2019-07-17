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

        // this.propsReceived = this.props.navigation.addListener('willFocus', () => {
        //     if (FirebaseSVC.shared().propsData !== null) {
        //         this.openChatIfIdExists();
        //     }
        // })

    }

    componentWillUnmount() {
        this.mounted = false
    }

    openChatIfIdExists() {
        // var {user, mid} = FirebaseSVC.shared().propsData;
        //
        // if (user && mid) {
        //     var user = user;
        //     user['messageKey'] = mid;
        //
        //     this.props.navigation.navigate('MessageDetailView', {user: user})
        //     FirebaseSVC.shared().setPropsData(null);
        // }
    }

    getUserList = () => {
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
