import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {Button} from "react-native-elements";

import * as firebase from 'firebase';
import Firebase from "./FirebaseSVC";

export default class FavoriteItem extends Component {

  state = {
    user: {
      name: '',
      title: '',
      reasearch_fields: ''
    }
  }

  componentDidMount(){
    Firebase.shared().user(this.props.user.user).get().then(doc => {
      this.setState({
        user: doc.data()
      });
    })
  }

    collaborateButtonPressed() {

    }

    favoriteButtonTapped() {
      Firebase
      .shared()
      .favorites()
      .where("uid", "==", Firebase.shared().currentUser.uid)
      .where("user", "==", this.state.user.uid)
      .limit(1)
      .get()
      .then(query => {
        console.log(query.size)
        if (query.size !== 0) {
          Firebase
          .shared()
          .favorite(query.docs[0].id)
          .delete()
        }
      })
    }

    render() {
        return (
            <View style={styles.outerContainer}>
                <AntDesignIcon
                    name="star"
                    style={{color: '#008080', margin: 8}}
                    size={28}
                />
                <View style={styles.innerContainer}>
                    <Text style={{fontSize: 17, fontWeight: 'bold', margin: 1}}>{this.state.user.name}</Text>
                    <Text style={{fontSize: 14, margin: 1}}>{this.state.user.title}</Text>
                    <Text style={{fontSize: 14, color: 'gray', margin: 1}}>{this.state.user.research_fields}</Text>
                    <View style={styles.buttonsView}>
                        <Button
                            title='Collaborate'
                            buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10}}
                            containerStyle={{flex: 1, margin: 4}}
                            titleStyle={{color: 'white'}}
                            onPress={() => this.collaborateButtonPressed()}
                        />
                        <Button
                            title='Unfavorite'
                            buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10}}
                            containerStyle={{flex: 1, margin: 4}}
                            titleStyle={{color: 'white'}}
                            onPress={() => this.favoriteButtonTapped()}
                        />
                    </View>
                </View>
            </View>
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
