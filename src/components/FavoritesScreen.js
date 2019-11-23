import React, {Component} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import FavoriteItem from "./FavoriteItem";

import * as firebase from 'firebase';
import Firebase from "./FirebaseSVC";
import {FloatingAction} from "react-native-floating-action";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog from "react-native-dialog";
import validate from "./Validator";

export default class FavoritesScreen extends Component {

    state = {
        eventList: [],
        isDialogVisible: false,
        eventName: '',
        eventDescription: '',
        eventLocation: ''
    };

    componentDidMount() {
        this.mounted = true
        this.getFavorites()
    }

    componentWillUnmount(){
      this.mounted = false
    }

    getFavorites() {
        this.mounted && Firebase.shared().events().orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            this.setState({eventList: []});
            for (var doc in snapshot.docs) {
                let data = snapshot.docs[doc].data();
                data['key'] = snapshot.docs[doc].id;
                this.setState(prevState => ({
                    eventList: [...prevState.eventList, data]
                }));
            }
        })
      // this.mounted &&
      // Firebase
      // .shared()
      // .events()
      // .onSnapshot(query => {
      //   query.docChanges().forEach(change => {
      //     if (change.type === 'added') {
      //       let data = change.doc.data();
      //       data['key'] = change.doc.id;
      //       this.setState(prevState => ({
      //           eventList: [...prevState.eventList, data]
      //       }));
      //     } else if (change.type === 'removed') {
      //       this.setState({eventList: this.state.eventList.filter(function(user) {
      //           return
      //           user.uid !== change.doc.data().uid
      //           && user.user !== change.doc.data().user
      //       })});
      //     }
      //   });
      // })
    }

    showDialog = (show) => {
        this.setState({
            isDialogVisible: show
        })
    };

    addButtonTapped() {
        const dataError = validate('eventName', this.state.eventName) && validate('eventLocation', this.state.eventLocation) && validate('eventDescription', this.state.eventDescription);

        this.setState({
            dataError: dataError
        });

        if (dataError) {
            return
        }

        this.mounted && Firebase.shared().events().add({
            eventName: this.state.eventName,
            eventLocation: this.state.eventLocation,
            eventDescription: this.state.eventDescription,
            createdAt: Date.now(),
            uid: Firebase.shared().currentUser.uid
        }).then(() => {
            this.cancelButtonTapped()
        })
    }

    cancelButtonTapped() {
        this.setState({
            isDialogVisible: false,
            currentItem: '',
            dataError: null,
            eventName: '',
            eventLocation: '',
            eventDescription: ''
        })
    }

    render() {

        const actions = [
            {
                text: "Add Event",
                icon: <Icon
                    name="plus"
                    size={22}
                    color="white"
                />,
                name: "event",
                position: 1,
                color: '#00BCD4'
            }
        ];

        return (
            <View style={styles.container}>
                {
                    this.state.eventList.length > 0
                        ? <FlatList
                            data={this.state.eventList}
                            renderItem={({item}) => <FavoriteItem event={item}/>}
                            keyExtractor={(item) => '' + item.createdAt}
                        />
                        : <Text style={{textAlign: 'center'}}>No events found.</Text>
                }
                <Dialog.Container visible={this.state.isDialogVisible}>
                    <Dialog.Title>Add event</Dialog.Title>
                    <Dialog.Input label="Event Name" value={this.state.eventName} onChangeText={(text) => this.setState({eventName: text})}></Dialog.Input>
                    <Dialog.Input label="Event Location" value={this.state.eventLocation} onChangeText={(text) => this.setState({eventLocation: text})}></Dialog.Input>
                    <Dialog.Input label="Event Description" value={this.state.eventDescription} onChangeText={(text) => this.setState({eventDescription: text})}></Dialog.Input>
                    <Dialog.Button label="Cancel" onPress={() => this.cancelButtonTapped()} />
                    <Dialog.Button label="Add" onPress={() => this.addButtonTapped()} />
                    {
                        this.state.dataError
                            ? <Dialog.Description>
                                Please complete the details
                            </Dialog.Description>
                            : null
                    }
                </Dialog.Container>
                <FloatingAction
                    actions={actions}
                    overrideWithAction={true}
                    onPressItem={name => {
                        this.setState({currentItem: `${name}`, isDialogVisible: true});
                    }}
                    color="#00BCD4"
                />
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
