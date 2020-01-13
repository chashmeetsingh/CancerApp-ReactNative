import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class Step1 extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Button title="x" style={{backgroundColor: 'red', height: 100, width: 100, color: 'green'}} />
        <View style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 12, flex: 1}}>
          <Text style={{color: '#424242', fontSize: 17}}>
            Regular physical activity is vital for good physical and mental health. It helps improve your overall health and fitness, maintain a healthy weight, reduce your risk for many chronic diseases and promote good mental health.
            {"\n"}{"\n"}
            Australia's Physical Activity and Sedentary Behaviour Guidelines recommend that at least 30 minutes of moderate-intensity physical activity on most, preferably all, days is required for good health. This is the same for women and men. However, only 54 per cent of Australian women meet these guidelines.
            {"\n"}{"\n"}
            Some of the barriers to physical exercise that women face include family responsibilities, body image and perceptions of safety.
          </Text>
        </View>
        <View style={{padding: 16}}>
          <Text style={{marginBottom: 0}}>For more information visit:</Text>
          <Text style={{marginBottom: 40, color: '#F58015', textDecorationLine: 'underline'}}>https://www.betterhealth.vic.gov.au/health/healthyliving/physical-activity-for-women</Text>
        </View>
      </View>
    )
  }

}
