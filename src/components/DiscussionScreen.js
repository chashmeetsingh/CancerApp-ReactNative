import React, {Component} from 'react'

import * as firebase from 'firebase';
import {Bubble, GiftedChat} from 'react-native-gifted-chat'
import Firebase from "./FirebaseSVC";

export default class DiscussionScreen extends Component {

    state = {
        messages: []
    }

    constructor(props) {
        super(props);

        this.mounted = false
    }

    componentWillUnmount() {
        this.mounted = false
    }

    componentDidMount() {
        this.mounted = true
        this.collab = this.props.navigation.getParam('collab');
        this.getThreadMessages()
    }

    getThreadMessages() {
        Firebase.shared().collab(this.collab.key).collection('discussion').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
          var messages = [];
          for (var doc in snapshot.docs) {
            messages.push(snapshot.docs[doc].data());
          }
          this.setState({
            messages: messages
          });
        })

        Firebase.shared().collab(this.collab.key).get().then(doc => {
          var hits = doc.data().hits;
          Firebase.shared().collab(this.collab.key).update({
            hits: hits + 1
          })
        })
    }

    get user() {
        const currentUser = Firebase.shared().currentUser;

        return {
            name: currentUser.name,
            id: currentUser.uid,
            _id: currentUser.uid,
            avatar: currentUser.photoURL
        };
    }

    onSend(messages = []) {
        let message = messages[0];
        message.createdAt = Date.now();
        this.mounted && Firebase.shared().collab(this.collab.key).collection('discussion').add(message);
        Firebase.shared().collab(this.collab.key).get().then(doc => {
          var hits = doc.data().hits;
          Firebase.shared().collab(this.collab.key).update({
            hits: hits + 1,
            updatedAt: Date.now()
          })
        })
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
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                renderBubble={this.renderBubble}
                user={this.user}
            />
        )
    }
}
