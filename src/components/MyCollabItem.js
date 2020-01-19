import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Firebase from "./FirebaseSVC";

export default class MyCollabItem extends Component {

  state = {
    user: {
      name: ''
    }
  };

  componentDidMount() {
    const member = this.props.conversation.createdBy == Firebase.shared().currentUser.uid
      ? this.props.conversation.member
      : this.props.conversation.createdBy;

    Firebase.shared().user(member).get().then(doc => {
      this.setState({
        user: doc.data()
      })
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <FontAwesomeIcon
          name={
            this.props.conversation.status == "accepted"
            ? "check-circle" : this.props.conversation.status == "waiting"
            ? "exclamation-circle" : "times-circle"
          }
          size={17}
          color={
            this.props.conversation.status == "accepted"
              ? "green" : this.props.conversation.status == "waiting"
              ? "#FFC107" : "red"
          }
          style={{marginRight: 10}}
        />
        <Text>{this.state.user.name}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    alignContent: 'center',
    borderRadius: 10
  }
});
