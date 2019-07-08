import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {Button} from "react-native-elements";

import * as firebase from 'firebase';
import FirebaseSVC from "./FirebaseSVC";

export default class FavoriteItem extends Component {

  collaborateButtonPressed() {

  }

    unfavoriteButtonTapped() {
        firebase.database().ref('/saves/' + FirebaseSVC.shared().currentUser.uid).once('value', snapshot => {
            for (var key in snapshot.val()) {
                if (snapshot.val()[key] === this.props.user.uid) {
                    firebase.database().ref('/saves/' + FirebaseSVC.shared().currentUser.uid).child(key).remove();
                    break;
                }
            }
        });
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
                            title='Unfavorite'
                            buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10}}
                            containerStyle={{flex: 1, margin: 4}}
                            titleStyle={{color: 'white'}}
                            onPress={() => this.unfavoriteButtonTapped()}
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
        shadowOpacity: 0.4,
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
