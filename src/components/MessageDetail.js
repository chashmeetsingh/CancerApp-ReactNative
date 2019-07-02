import React, {Component} from 'react';

import {GiftedChat} from 'react-native-gifted-chat'
import * as firebase from 'firebase';

export default class MessageDetail extends Component {

    state = {
        messages: []
    };

    componentDidMount() {
        this.messageKey = this.props.navigation.getParam('user').messageKey;
        this.getMessages()
    }

    get user() {
        const currentUser = firebase.auth().currentUser;
        return {
            // name: currentUser.name,
            id: currentUser.uid,
            _id: currentUser.uid
        };
    }

    getMessages = () => {
        firebase.database().ref('/messages/' + this.messageKey).once('value', (snapshot) => {
            var messages = [];
            for (var key in snapshot.val()) {
                messages.push(snapshot.val()[key]);
            }
            this.setState({messages: messages.reverse()});
        })
    };

    onSend(messages = []) {
        // console.log(messages);
        let message = messages[0];
        message.createdAt = Date.now();
        firebase.database().ref('/messages/' + this.messageKey).push(message, () => {
            console.log(message);
            // this.setState(prevState => {
            //     messages: GiftedChat.append(prevState.messages, message);
            // })
        });
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={this.user}
            />
        )
    }

}