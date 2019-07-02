import React, {Component} from 'react';

import {Bubble, GiftedChat} from 'react-native-gifted-chat'
import * as firebase from 'firebase';
import FirebaseSVC from "./FirebaseSVC";

export default class MessageDetail extends Component {

    state = {
        messages: []
    };

    componentDidMount() {
        this.messageKey = this.props.navigation.getParam('user').messageKey;
        this.getMessages();
        // this.listenAndAddMessages();
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

    getMessages = () => {
        firebase.database().ref('/messages/' + this.messageKey).on('value', (snapshot) => {
            var messages = [];
            for (var key in snapshot.val()) {
                messages.push(snapshot.val()[key]);
            }
            this.setState({messages: messages.reverse()});
        })
    };

    onSend(messages = []) {
        let message = messages[0];
        message.createdAt = Date.now();
        firebase.database().ref('/messages/' + this.messageKey).push(message);
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