import React, {Component} from 'react'
import {ImageBackground, ScrollView, Text, View} from 'react-native'

import BulletinBoardImage from '../../assets/bulletin-board.jpg'
import CollabItem from "./CollabItem";

export default class CollabBoardScreen extends Component {

    state = {
        articles: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10},]
    };

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
                        <CollabItem index={0}/>
                        <CollabItem index={1}/>
                        <CollabItem index={2}/>
                        <CollabItem index={3}/>
                        <CollabItem index={4}/>
                        <CollabItem index={5}/>
                        <CollabItem index={6}/>
                        <CollabItem index={7}/>
                        <CollabItem index={8}/>
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
                        <CollabItem index={0}/>
                        <CollabItem index={1}/>
                        <CollabItem index={2}/>
                        <CollabItem index={3}/>
                        <CollabItem index={4}/>
                        <CollabItem index={5}/>
                        <CollabItem index={6}/>
                        <CollabItem index={7}/>
                        <CollabItem index={8}/>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }

}