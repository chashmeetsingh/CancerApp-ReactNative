import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Firebase from "./FirebaseSVC";

export default class MessageItem extends Component {

  state = {
    name: ''
  }

  componentDidMount(){
    Firebase.shared().user(this.props.conversation.member).get().then(doc => {
      if (doc.exists) {
        this.setState(doc.data())
      }
    });
  }

    handleMessageItemPressed = () => {
        this.props.navigation.navigate('MessageDetailView', {user: this.state, conversation: this.props.conversation});
    };

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.handleMessageItemPressed()}>
                <Text style={styles.name}>{this.state.name}</Text>
                <IoniconsIcon
                    name="ios-arrow-forward"
                    style={{color: 'gray'}}
                    size={24}
                />
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 17
    }
});
