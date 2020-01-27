import React, {Component} from 'react'
import {Button} from 'react-native-elements'
import {StyleSheet, Text, View} from 'react-native'
import Firebase from "./FirebaseSVC";

export default class CollaborateRequest extends Component {

  componentDidMount(){
    this.user = this.props.user;
    this.messageKey = this.props.messageKey;
  }

  acceptRequestButtonTapped() {
    console.log(this.key)
    Firebase.shared().getMessage(this.messageKey).update({
      status: 'accepted'
    }).then(() => {
      this.props.updateStatus('accepted');
    })
  }

  rejectRequestButtonTapped() {
    Firebase.shared().getMessage(this.messageKey).update({
      status: 'rejected'
    }).then(() => {
      this.props.updateStatus('rejected');
    })
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={{textAlign: 'center'}}>Chashmeet has sent you a request to collaborate</Text>
          <View style={{flexDirection: 'row'}}>
            <Button
                title='Accept'
                buttonStyle={{backgroundColor: '#25d366', borderRadius: 16, margin: 6}}
                titleStyle={{color: 'white'}}
                onPress={() => this.acceptRequestButtonTapped()}
            />
            <Button
                title='Reject'
                buttonStyle={{backgroundColor: 'red', borderRadius: 16, margin: 6}}
                titleStyle={{color: 'white'}}
                onPress={() => this.rejectRequestButtonTapped()}
            />
          </View>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  }
})
