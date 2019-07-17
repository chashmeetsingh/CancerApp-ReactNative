import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'

import * as firebase from 'firebase';
import MatchItem from "./MatchItem";

export default class MostRelative extends Component {

    state = {
        userList: []
    }

    componentDidMount() {
      this.mounted = true
        this.getMatches()
    }

    componentWillUnmount(){
      this.mounted = false
    }

    getMatches = () => {
        this.mounted && firebase.database().ref('/users').on('value', (snapshot) => {
            var users = [];
            for (var uid in snapshot.val()) {
                if (uid !== firebase.auth().currentUser.uid) {
                    users.push(snapshot.val()[uid]);
                }
            }
            this.setState({userList: users});
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.userList}
                    renderItem={({item}) => <MatchItem user={item} navigation={this.props.navigation} />}
                    keyExtractor={(item) => item.uid}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    listItem: {
        margin: 8
    },
})
