import React, {Component} from 'react'
import {ImageBackground, ScrollView, Text, View, FlatList} from 'react-native'

import BulletinBoardImage from '../../assets/bulletin-board.jpg'
import CollabItem from "./CollabItem";

import * as firebase from 'firebase';
import FirebaseSVC from "./FirebaseSVC";

export default class CollabBoardScreen extends Component {

    state = {
        collabs: []
    };

    getCollabs = () => {
      firebase.database().ref('/collabs').on('value', snapshot => {
        var collabs = [];
        for (var key in snapshot.val()) {
          var collab = snapshot.val()[key];
          collab['id'] = key;
          collabs.push(collab);
        }
        this.setState({
          collabs: collabs
        })
      })
    }

    componentDidMount() {
      this.getCollabs()
    }

    render() {
        return (
            <ImageBackground style={{width: '100%', height: '100%'}} source={BulletinBoardImage}>
                <ScrollView style={{flex: 1}}>
                    <View style={{
                        flexWrap: 'wrap',
                        flex: 1,
                        flexDirection: 'row',
                        padding: 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                      {
                        this.state.collabs.map((item, index) => {
                          return <CollabItem index={index} item={item} key={item.id} />
                        })
                      }
                    </View>
                    <Text style={{margin: 10, fontSize: 18, fontWeight: 'bold', color: 'white'}}>Past Week</Text>
                    <View style={{
                        flexWrap: 'wrap',
                        flex: 1,
                        flexDirection: 'row',
                        padding: 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                      {
                        this.state.collabs.map((item, index) => {
                          return <CollabItem index={index} item={item} key={item.id} />
                        })
                      }
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }

}
