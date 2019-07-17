import React, {Component} from 'react'

import * as firebase from 'firebase';
import {Bubble, GiftedChat} from 'react-native-gifted-chat'
import FirebaseSVC from "./FirebaseSVC";

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
        this.mounted && firebase.database().ref('/collabs/' + this.collab.id + '/messages').on('value', snapshot => {
            var messages = [];
            for (var key in snapshot.val()) {
                messages.push(snapshot.val()[key]);
            }
            this.setState({messages: messages.reverse()});
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

    onSend(messages = []) {
        let message = messages[0];
        message.createdAt = Date.now();
        this.mounted && firebase.database().ref('/collabs/' + this.collab.id + '/messages').push(message);
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
