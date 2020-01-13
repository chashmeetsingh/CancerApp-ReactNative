import React, { Component } from 'react';
import {View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity} from 'react-native';

export default class CalendarDetailReadOnly extends Component {

  render() {
    return (
      <ImageBackground style={{flex: 1, display: 'flex'}} source={require('./yellowbanner.png')}>
        <View style={{flex: 2}}>
          <Text style={{height: 38,	color:' #424242',	fontSize: 28,	fontWeight: 'bold',	lineHeight: 38, textAlign: 'center', marginTop: 60}}>Today - 17 Oct</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={{color: '#424242', textAlign: 'center', fontSize: 28, marginTop: 10}}>My Symptoms</Text>

          <View style={{flexDirection: 'row', height: 'auto'}}>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./medium.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                <Text style={styles.buttonWithImageHeading}>Medium</Text>
              </View>

            </View>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./cramps.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                <Text style={styles.buttonWithImageHeading}>Cramps</Text>
              </View>
            </View>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./tender-breasts.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                <Text style={styles.buttonWithImageHeading}>Tender Breasts</Text>
              </View>
            </View>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./taken.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                <Text style={styles.buttonWithImageHeading}>Pill Taken</Text>
              </View>
            </View>
          </View>

          <View style={{display: 'flex', alignItems: 'center'}}>
            <TouchableOpacity style={{backgroundColor: 'white', margin: 20, width: 174, padding: 20, borderRadius: 22, borderWidth: 3, borderColor: '#F58015'}}>
              <Text style={{textAlign: 'center'}}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 22}}>
            <Text style={{color: '#424242', fontSize: 22,	fontWeight: 'bold', textAlign: 'center'}}>My Journal Entry</Text>
            <Text style={{margin: 16, flexWrap: 'wrap', height: 200}}>Seven Ways To Motivate Yourself
              1. Explain your plans. Usually, by the time I tell my wife about the newsletter I’m going to write, I’m out of my slump and back at the keyboard. Find someone that listens well, and tell them what you want to do. If it is something that you really want, this will almost always get you motivated.
              2. Stimulate desire. Imagine the rewards of your effort clearly. Imagination motivates many to sign up for get-rich-quick plans. Good salesmen can have you living in your imagined dream home in minutes, and you’ll feel motivated to do anything to make it real. Just learn to be your own salesman.
              3. Use pain. Neuro-Linguistic Programming (NLP) teaches you to link pain with not acting. </Text>
            <Text style={{textAlign: 'right', paddingRight: 10, color: '#F58015', fontSize: 17, textDecorationLine: 'underline'}}>Read More</Text>
          </View>

        </View>
      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 80,
    marginLeft: 20,
    marginRight: 20
  }
});
