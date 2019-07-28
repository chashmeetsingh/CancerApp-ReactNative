import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Button, Text} from 'react-native-elements'

import Firebase from "./FirebaseSVC";

export default class MatchItem extends Component {

    currentUser = Firebase.shared().currentUser;

    state = {
      label: 'Favorite'
    }

    componentDidMount(){
      Firebase
      .shared()
      .favorites()
      .where("uid", "==", this.currentUser.uid)
      .where("user", "==", this.props.user.uid)
      .limit(1)
      .get()
      .then(query => {
        if (query.size === 0) {
          this.setState({
            label: 'Favorite'
          });
        } else {
          this.setState({
            label: 'Unfavorite'
          });
        }
      })
    }

    collaborateButtonPressed = () => {
        const mid1 = this.currentUser.uid + ',' + this.props.user.uid
        const mid2 = this.props.user.uid + ',' + this.currentUser.uid

        Firebase
        .shared()
        .getMessage(mid1)
        .get()
        .then(doc => {
          if (doc.exists) {
            Firebase
            .shared()
            .propsData = {
              user: this.props.user.uid,
              mid: mid1
            }
            this.props.navigation.navigate('Messaging');
          } else {
            Firebase
            .shared()
            .getMessage(mid2)
            .get()
            .then(doc => {
              if (doc.exists) {
                Firebase
                .shared()
                .propsData = {
                  user: this.props.user.uid,
                  mid: mid2
                }
                this.props.navigation.navigate('Messaging');
              } else {
                Firebase
                .shared()
                .getMessage(mid1)
                .set({
                  createdAt: Date.now(),
                  createdBy: this.currentUser.uid,
                  member: this.props.user.uid,
                  status: 'waiting',
                  updatedAt: Date.now()
                }).then(() => {
                  Firebase
                  .shared()
                  .propsData = {
                    user: this.props.user.uid,
                    mid: mid1
                  }
                  this.props.navigation.navigate('Messaging');
                })
              }
            })
          }
        })
    };

    favoriteButtonTapped = () => {
      Firebase
      .shared()
      .favorites()
      .where("uid", "==", this.currentUser.uid)
      .where("user", "==", this.props.user.uid)
      .limit(1)
      .get()
      .then(query => {
        if (query.size === 0) {
          this.setState({
            label: 'Unfavorite'
          });
          Firebase
          .shared()
          .favorites()
          .add({
            createdAt: Date.now(),
            uid: this.currentUser.uid,
            user: this.props.user.uid
          })
        } else {
          this.setState({
            label: 'Favorite'
          });
          Firebase
          .shared()
          .favorite(query.docs[0].id)
          .delete()
        }
      })
    };

    itemTapped() {
      this.props.navigation.navigate('UserProfileView', {user: this.props.user})
    }

    render() {
        return (
            <TouchableOpacity style={styles.outerContainer} onPress={() => this.itemTapped()}>
                <AntDesignIcon
                    name="star"
                    style={{color: '#008080', margin: 8}}
                    size={28}
                />
                <View style={styles.innerContainer}>
                    <Text style={{fontSize: 17, fontWeight: 'bold', margin: 1}}>{this.props.user.name}</Text>
                    <Text style={{fontSize: 14, margin: 1}}>{this.props.user.title}</Text>
                    <Text style={{fontSize: 14, color: 'gray', margin: 1}}>{this.props.user.research_fields}</Text>
                    <View style={styles.buttonsView}>
                        <Button
                            title='Collaborate'
                            buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10}}
                            containerStyle={{flex: 1, margin: 4}}
                            titleStyle={{color: 'white'}}
                            onPress={() => this.collaborateButtonPressed()}
                        />
                        <Button
                            title={this.state.label}
                            buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10}}
                            containerStyle={{flex: 1, margin: 4}}
                            titleStyle={{color: 'white'}}
                            onPress={() => this.favoriteButtonTapped()}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 8,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        flex: 1,
        elevation: 1,
        borderWidth: 0.1,
        borderRadius: 4,
        borderColor: '#eee',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0.5},
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    innerContainer: {
        flexDirection: 'column',
        margin: 4,
        flex: 2
    },
    buttonsView: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 4,
        flex: 1,
        width: '100%',
    }
});
