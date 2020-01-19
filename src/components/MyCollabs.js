import React, {Component} from 'react'
import {
  View,
  Text, FlatList, StyleSheet
} from "react-native";
import Firebase from "./FirebaseSVC";
import MyCollabItem from "./MyCollabItem";
import MessageItem from "./MessageItem";

export default class MyCollabs extends Component {

  state = {
    userUids: [],
    userList: [],
    messageIds: [],
    conversations: []
  };

  componentDidMount() {
    this.mounted = true;
    this.getUserList();
  }

  componentWillUnmount() {
    this.mounted = false;
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
            console.log(this.state.conversations);
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
              renderItem={({item}) => <MyCollabItem conversation={item} navigation={this.props.navigation}/>}
              keyExtractor={(item) => item.key}
            />
            :
            <View style={styles.noMessageContainer}>
              <Text>No collaborations yet.</Text>
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
