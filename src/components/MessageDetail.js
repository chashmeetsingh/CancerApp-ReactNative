import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {Bubble, GiftedChat} from 'react-native-gifted-chat'
import * as firebase from 'firebase';
import Firebase from "./FirebaseSVC";
import CollaborateRequest from './CollaborateRequest'

export default class MessageDetail extends Component {

    state = {
        messages: [],
        status: 'accepted',
        conversation: {
          createdBy: ''
        },
        data: {
          name: ''
        }
    }

    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;

      return {
        title: params ? params.name : 'Message Detail',
      };
    };

    componentDidMount() {
        this.mounted = true
        // this.messageKey = this.props.navigation.getParam('user').messageKey;
        // this.currentUser = FirebaseSVC.shared().currentUser;

        this.setState({
          data: this.props.navigation.getParam('user'),
          conversation: this.props.navigation.getParam('conversation')
        }, () => {
          this.props.navigation.setParams({
            name: this.state.data.name
          })

          this.getMessages();
        })
    }

    componentWillUnmount() {
        this.mounted = false
        this.messageListener();
    }

    getMessages() {
      const mid1 = this.state.conversation.createdBy + ',' + this.state.conversation.member;
      const mid2 = this.state.conversation.member + ',' + this.state.conversation.createdBy;

      this.mounted && Firebase.shared().getMessage(mid1).get().then(doc => {
        if (doc.exists) {
          this.messageKey = mid1;
          this.setState({
            status: doc.data().status
          });
        } else {
          this.messageKey = mid2;
          Firebase.shared().getMessage(mid2).get().then(doc => {
            if (doc.exists) {
              this.setState({
                status: doc.data().status
              });
            }
          })
        }
      }).then(() => {
        this.messageListener = Firebase.shared().getMessage(this.messageKey).collection('messages').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
          var messages = [];
          for (var doc in snapshot.docs) {
            messages.push(snapshot.docs[doc].data());
          }
          this.setState({
            messages: messages
          });
        })
      })
    }

    get user() {
        const currentUser = Firebase.shared().currentUser;
        return {
            name: currentUser.name,
            _id: currentUser.uid,
            id: currentUser.uid,
            avatar: currentUser.photoURL
        };
    }

    onSend(messages = []) {
        let message = messages[0];
        message.createdAt = Date.now();
        Firebase.shared().getMessage(this.messageKey).collection('messages').add(message).then(() => {
          Firebase.shared().getMessage(this.messageKey).update({
            updatedAt: Date.now()
          })
        });
    }

    renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: 'white',
                    },
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#00BCD4',
                    },
                }}
            />
        );
    };

    render() {
      if (this.state.conversation.createdBy === Firebase.shared().currentUser.uid) {
        if (this.state.status === 'waiting') {
          return (
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, padding: 10}}>
                <Text>Your collaboration request has been sent.</Text>
            </View>
          )
        } else if (this.state.status === 'accepted') {
          return (
              <GiftedChat
                  messages={this.state.messages}
                  onSend={messages => this.onSend(messages)}
                  renderBubble={this.renderBubble}
                  user={this.user}
              />
          )
        } else {
          return (
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, padding: 10}}>
                  <Text>Your request has been declined</Text>
              </View>
          )
        }
      } else {
        if (this.state.status === 'waiting') {
          return <CollaborateRequest user={this.props.navigation.getParam('user')} />
        } else if (this.state.status === 'accepted') {
          return (
              <GiftedChat
                  messages={this.state.messages}
                  onSend={messages => this.onSend(messages)}
                  renderBubble={this.renderBubble}
                  user={this.user}
              />
          )
        } else {
          return (
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, padding: 10}}>
                <Text>You have declined the collaboration request.</Text>
            </View>
          )
        }
      }
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

})
