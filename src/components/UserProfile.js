import React, {Component} from 'react'
import {Text, View, StyleSheet, ScrollView} from 'react-native'
import {Input} from 'react-native-elements'

import FirebaseSVC from "./FirebaseSVC";

export default class UserProfile extends Component {

  state = {
        user: {}
    };

  async componentDidMount() {
        this.currentUser = FirebaseSVC.shared().currentUser;

        this.setState({
            user: this.currentUser
        })
    }

  render() {
    return (
      <ScrollView style={styles.profileDataContainer}>
        <Input
              placeholder='Title'
              inputContainerStyle={{
                  borderWidth: 0.5,
                  borderColor: '#BDBDBD',
                  borderRadius: 10,
                  backgroundColor: 'white'
              }}
              containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
              inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14, height: 20}}
              autoCompleteType='off'
              value={this.state.user.title}
          />
          <Input
              placeholder='Affiliation'
              inputContainerStyle={{
                  borderWidth: 0.5,
                  borderColor: '#BDBDBD',
                  borderRadius: 10,
                  backgroundColor: 'white'
              }}
              containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
              inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
              autoCompleteType='off'
              // onChangeText={(affiliation) => this.setState({affiliation: affiliation})}
              value={this.state.user.affiliation}
          />
          <Input
              placeholder='Location'
              inputContainerStyle={{
                  borderWidth: 0.5,
                  borderColor: '#BDBDBD',
                  borderRadius: 10,
                  backgroundColor: 'white'
              }}
              containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
              inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
              autoCompleteType='off'
              // onChangeText={(location) => this.setState({location: location})}
              value={this.state.user.location}
          />
          <Input
              placeholder='Experience'
              inputContainerStyle={{
                  borderWidth: 0.5,
                  borderColor: '#BDBDBD',
                  borderRadius: 10,
                  backgroundColor: 'white'
              }}
              containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
              inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
              autoCompleteType='off'
              // onChangeText={(experience) => this.setState({experience: experience})}
              value={this.state.user.experience}
          />
          <Input
              placeholder='Research Fields'
              inputContainerStyle={{
                  borderWidth: 0.5,
                  borderColor: '#BDBDBD',
                  borderRadius: 10,
                  backgroundColor: 'white'
              }}
              containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
              inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
              autoCompleteType='off'
              // onChangeText={(research_fields) => this.setState({research_fields: research_fields})}
              value={this.state.user.research_fields}
          />
          <Input
              placeholder='Website Link'
              inputContainerStyle={{
                  borderWidth: 0.5,
                  borderColor: '#BDBDBD',
                  borderRadius: 10,
                  backgroundColor: 'white'
              }}
              containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
              inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
              autoCompleteType='off'
              // onChangeText={(website_link) => this.setState({website_link: website_link})}
              value={this.state.user.website_link}
          />
          <Input
              placeholder='Keywords'
              inputContainerStyle={{
                  borderWidth: 0.3,
                  borderColor: '#BDBDBD',
                  borderRadius: 10,
                  backgroundColor: 'white'
              }}
              containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
              inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
              autoCompleteType='off'
              // onChangeText={(keywords) => this.setState({keywords: keywords})}
              value={this.state.user.keywords}
          />
          <Input
              placeholder='Bio'
              inputContainerStyle={{
                  borderWidth: 0.3,
                  borderColor: '#BDBDBD',
                  borderRadius: 10,
                  backgroundColor: 'white'
              }}
              containerStyle={{margin: 4, marginBottom: 10}}
              inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14}}
              autoCompleteType='off'
              // onChangeText={(bio) => this.setState({bio: bio})}
              value={this.state.user.bio}
          />
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  profileDataContainer: {
      margin: 4
  }
})
