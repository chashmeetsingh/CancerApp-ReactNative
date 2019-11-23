import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'

import * as firebase from 'firebase';
import MatchItem from "./MatchItem";
import Firebase from "./FirebaseSVC";

import { SearchBar } from 'react-native-elements';

export default class MostRecent extends Component {

    state = {
        userList: [],
        search: ''
    };

    componentDidMount() {
      this.mounted = true
        this.getMatches()
    }

    componentWillUnmount(){
      this.mounted = false
    }

    updateSearch = search => {
        this.setState({ search });
    };

    getMatches = () => {
      this.mounted && Firebase.shared().users().get().then(query => {
        var userList = [];
        for (var doc in query.docs) {
          if (query.docs[doc].data().uid !== Firebase.shared().currentUser.uid) {
            userList.push(query.docs[doc].data());
          }
        }
        this.setState({
          userList: userList
        });
      })
    };

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    containerStyle={{backgroundColor: '#eee', borderColor: 'red'}}
                    inputContainerStyle={{backgroundColor: 'white'}}
                    lightTheme={true}
                />
                <FlatList
                    data={this.state.userList.filter(a => a.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)}
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
