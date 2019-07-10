import React, {Component} from 'react'
import {Button} from 'react-native-elements'
import {View, Text, StyleSheet} from 'react-native'
import * as firebase from 'firebase';

export default class CollaborateRequest extends Component {

  componentDidMount(){
    this.user = this.props.user;
  }

  acceptRequestButtonTapped() {
    firebase.database().ref('/messages/' + this.user.messageKey).update({
      status: 'accepted'
    })
  }

  rejectRequestButtonTapped() {
    firebase.database().ref('/messages/' + this.user.messageKey).update({
      status: 'rejected'
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
