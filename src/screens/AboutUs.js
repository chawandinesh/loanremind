import React from 'react';
import {View, Text, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default function AboutUs(props) {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
    });
  }, [props.navigation]);
  return (
    <View
      style={{
        width: width,
        // marginTop: height * 0.12,
        alignItems: 'center',
        height: height * 0.9,
        padding: height * 0.02,
        backgroundColor: '#fcf5ed',
        justifyContent: 'center',
      }}>
    
    <View style={{backgroundColor:'#fff', elevation: 3, padding: 10, width: width * 0.95}}>

      <Text style={{fontSize: 18, marginBottom: 10}}>
        An easy to use, amazing and ads free app to remind your loan details.
      </Text>
    </View>
      <Text style={{fontSize: 23, marginVertical: 10, fontWeight: 'bold', color: 'green'}}>
        Features of the app
      </Text>
      <View style={{width: width * 0.95, backgroundColor:'#fff', height: height * 0.4, justifyContent:'space-around', elevation: 3}}>

      <Text style={{fontSize: 18, color: 'gray'}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}></Text>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            paddingBottom: height * 0.05,
            fontWeight: 'bold',
          }}>
          Choose Category
        </Text>{' '}
        - User can choose the category of loan which they have to take for the specific purpose.{' '}
        {'\n'}
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          Add details
        </Text>{' '}
        - User can add the details of loan like date,interest, amount, due date ...etc, to manage easy way. {'\n'}
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          View Details
        </Text>{' '}
        - User can view the list of loans which is pending and which is already done.{' '}
        {'\n'}
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          Paid{' '}
        </Text>{' '}
        - User can make the loan to paid if it closes.{'\n'}
      </Text>
      </View>
      <Text style={{color: '#56f', fontWeight: 'bold', textAlign:'center', fontSize: 20}}>
        Download the app and remind your loan easyway.
      </Text>
    </View>
  );
}
