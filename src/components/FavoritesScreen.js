import React, {Component} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import FavoriteItem from "./FavoriteItem";

import * as firebase from 'firebase';
import Firebase from "./FirebaseSVC";

export default class FavoritesScreen extends Component {

    state = {
        userList: []
    };

    componentDidMount() {
        this.mounted = true
        this.getFavorites()
    }

    componentWillUnmount(){
      this.mounted = false
    }

    getFavorites() {
      this.mounted &&
      Firebase
      .shared()
      .favorites()
      .where("uid", "==", Firebase.shared().currentUser.uid)
      .onSnapshot(query => {
        query.docChanges().forEach(change => {
          if (change.type === 'added') {
            let data = change.doc.data();
            data['key'] = change.doc.id;
            this.setState(prevState => ({
              userList: [...prevState.userList, data]
            }));
          } else if (change.type === 'removed') {
            this.setState({userList: this.state.userList.filter(function(user) {
                return
                user.uid !== change.doc.data().uid
                && user.user !== change.doc.data().user
            })});
          }
        });
      })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.userList.length > 0
                        ? <FlatList
                            data={this.state.userList}
                            renderItem={({item}) => <FavoriteItem user={item}/>}
                            keyExtractor={(item) => item.uid}
                        />
                        : <Text style={{textAlign: 'center'}}>No Favorites added.</Text>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        // alignItems: 'center',
        justifyContent: 'center'
    }
});
