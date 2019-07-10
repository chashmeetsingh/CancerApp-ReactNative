import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import {Bubble, GiftedChat} from 'react-native-gifted-chat'
import * as firebase from 'firebase';
import FirebaseSVC from "./FirebaseSVC";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import CollaborateRequest from './CollaborateRequest'

export default class MessageDetail extends Component {

    state = {
        messages: [],
        status: 'waiting'
    };

    constructor(props) {
      super(props);

      this.mounted = false
    }

    componentDidMount() {
      this.mounted = true
        this.messageKey = this.props.navigation.getParam('user').messageKey;
        this.getMessages();
        this.getRequestStatus()
    }

    componentWillUnmount() {
      this.mounted = false
    }

    getRequestStatus() {
      firebase.database().ref('/messages/' + this.messageKey + '/status').on('value', snapshot => {
        this.setState({
          status: snapshot.val()
        });
      })
    }

    get user() {
        const currentUser = FirebaseSVC.shared().currentUser;

        return {
            name: currentUser.name,
            id: currentUser.uid,
            _id: currentUser.uid,
            avatar: currentUser.photoUrl
        };
    }

    async getMessages() {
        firebase.database().ref('/messages/' + this.messageKey + '/list').on('value', (snapshot) => {
            var messages = [];
            for (var key in snapshot.val()) {
                messages.push(snapshot.val()[key]);
            }
            this.mounted && this.setState({messages: messages.reverse()});
        })
    };

    onSend(messages = []) {
        let message = messages[0];
        message.createdAt = Date.now();
        firebase.database().ref('/messages/' + this.messageKey + '/list').push(message);
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
            <Text>Your request has been declined</Text>
          </View>
        )
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
