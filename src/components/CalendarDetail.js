import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

export default class CalendarDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false,
      bleeding: 'light',
      pain: [],
      pill: 'taken'
    };
  }

  render() {
    return (
      <ImageBackground style={{flex: 1, display: 'flex'}} source={require('./yellowbanner.png')}>

        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 22}}>
          <Text style={{height: 38,	color:' #424242',	fontSize: 28,	fontWeight: 'bold',	lineHeight: 38, textAlign: 'center'}}>Today - 17 Oct</Text>
        </View>

        <View style={{borderRadius: 20, backgroundColor: 'white', flex: 8 }}>
          <Text style={styles.heading}>Bleeding</Text>

          <View style={{flexDirection: 'row', height: 'auto'}}>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./light.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                {
                  this.state.bleeding == 'light' ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Light</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Light</Text>
                }
              </View>

            </View>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./medium.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                <Text style={styles.buttonWithImageHeading}>Medium</Text>
                {
                  this.state.bleeding == 'medium' ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Light</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Light</Text>
                }
              </View>
            </View>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./heavy.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                <Text style={styles.buttonWithImageHeading}>Heavy</Text>
                {
                  this.state.bleeding == 'heavy' ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Light</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Light</Text>
                }
              </View>
            </View>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./spotting.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                <Text style={styles.buttonWithImageHeading}>Spotting</Text>
                {
                  this.state.bleeding == 'spotting' ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Light</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Light</Text>
                }
              </View>
            </View>
          </View>

          <Text style={styles.heading}>Pain</Text>

          <View style={{flexDirection: 'row', height: 'auto'}}>
            <View style={{flex: 0.3}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./cramps.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                <Text style={styles.buttonWithImageHeading}>Cramps</Text>
                {
                  this.state.pain.includes('cramps') ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Light</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Light</Text>
                }
              </View>

            </View>
            <View style={{flex: 0.3}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./headache.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                <Text style={styles.buttonWithImageHeading}>Headache</Text>
                {
                  this.state.pain.includes('cramps') ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Light</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Light</Text>
                }
              </View>
            </View>
            <View style={{flex: 0.4}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./tender-breasts.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                <Text style={styles.buttonWithImageHeading}>Tender Breasts</Text>
                {
                  this.state.pain.includes('cramps') ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Light</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Light</Text>
                }
              </View>
            </View>
          </View>

          <Text style={styles.heading}>Pill</Text>

          <View style={{flexDirection: 'row', height: 'auto'}}>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./taken.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                {
                  this.state.pill == 'taken' ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Taken</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Taken</Text>
                }
              </View>

            </View>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./missed.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                {
                  this.state.pill == 'missed' ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Missed</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Missed</Text>
                }
              </View>
            </View>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./double.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                {
                  this.state.pill == 'double' ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Double</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Double</Text>
                }
              </View>
            </View>
            <View style={{flex: 0.25}}>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image source={require('./late.png')} style={{height: 70, width: 70, resizeMode: 'contain'}} />
                {
                  this.state.pill == 'late' ?
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={[styles.buttonWithImageHeading, {color: '#F58015'}]}>Late</Text>
                      <Text style={{color: '#F58015'}}>•</Text>
                    </View>
                    : <Text style={styles.buttonWithImageHeading}>Late</Text>
                }
              </View>
            </View>
          </View>

          <View style={{alignItems: 'center', marginVertical: 43}}>
            <TouchableOpacity title={"Done"} style={{height: 44,	width: 174,	borderRadius: 22,	backgroundColor: '#F58015', display: 'flex', justifyContent: 'center'}} >
              <Text style={{textAlign: 'center', color: 'white'}}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modal: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10
  },
  modalButton: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F58015',
    fontFamily: 'Nunito',
    fontSize: 17,
    lineHeight: 23,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 33,
    width: 174,
    color: 'white'
  },
  heading: {
    height: 30,
    marginTop: 34,
    color: '#424242',
    // fontFamily: 'Nunito',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12
  },
  buttonWithImageHeading: {
    color: '#5F5D70',	fontSize: 17,	lineHeight: 23, textAlign: 'center'
  }
});
