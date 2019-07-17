import React, {Component} from 'react'
import {Platform, StyleSheet} from 'react-native'

import * as firebase from 'firebase';
import {Bubble, GiftedChat} from 'react-native-gifted-chat'
import Firebase from "./FirebaseSVC";
import emojiUtils from 'emoji-utils';

import SlackMessage from './SlackMessage';

export default class QuestionDetail extends Component {

    state = {
        comments: []
    }

    componentDidMount(){
        this.mounted = true
        this.currentUser = Firebase.shared().currentUser
        this.question = this.props.navigation.getParam('question')
        this.getComments()
    }

    getComments() {
        this.mounted && Firebase.shared().question(this.question.key).collection('discussion').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
          this.setState({comments: []});
          for (var doc in snapshot.docs) {
            let data = snapshot.docs[doc].data();
            data['key'] = snapshot.docs[doc].id;
            this.setState(prevState => ({
              comments: [...prevState.comments, data]
            }))
          }
        })

        // firebase.database().ref('/users/' + this.currentUser.uid + '/questions/' + this.data.key + '/comments').on('value', snapshot => {
        //     var comments = [];
        //     for (var key in snapshot.val()) {
        //         comments.push(snapshot.val()[key]);
        //     }
        //     this.setState({comments: comments.reverse()});
        // })
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

    onSend(comments = []) {
        let comment = comments[0];
        comment.createdAt = Date.now();
        this.mounted && Firebase.shared().question(this.question.key).collection('discussion').add(comment);
        // firebase.database().ref('/users/' + this.currentUser.uid + '/questions/' + this.data.key + '/comments').push(comment);
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

    renderMessage(props) {
        const { currentMessage: { text: currText } } = props;

        let messageTextStyle = {};

        // Make "pure emoji" messages much bigger than plain text.
        if (currText && emojiUtils.isPureEmojiString(currText)) {
            messageTextStyle = {
                fontSize: 28,
                // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
                lineHeight: Platform.OS === 'android' ? 34 : 30,
            };
        }

        return (
            <SlackMessage {...props} messageTextStyle={messageTextStyle} />
        );
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.comments}
                onSend={comments => this.onSend(comments)}
                user={this.user}
                renderMessage={this.renderMessage}
                showAvatarForEveryMessage={true}
                placeholder={"Type a comment..."}
            />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    }
})
