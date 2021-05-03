import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {height, width} = Dimensions.get('window');
export default function AddForm(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitle: 'Add Loan',
      headerTitleAlign: 'center',
      headerStyle: {backgroundColor: '#287'},
      headerTintColor: '#fff',
    });
  }, [props.navigation]);
  return (
    <View style={{height, width}}>
      <View
        style={{
          height: height * 0.75,
          width,
          justifyContent: 'space-evenly',
          backgroundColor: '#287',
          borderBottomRightRadius: height * 0.1,
          borderBottomLeftRadius: height * 0.1,
        }}>
        <Text
          style={{color: '#fff', textAlign: 'center', fontSize: height * 0.03}}>
          {moment(new Date()).format('DD-MM-YYYY')}
        </Text>
        <View
          style={{
            height: height * 0.08,
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#ffa',
          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#fff'}}>
            NAME
          </Text>
          <TextInput
            style={{
              height: height * 0.05,
              width: width * 0.8,
              backgroundColor: '#fff',
            }}
          />
        </View>
        <View
          style={{
            height: height * 0.08,
            alignItems: 'flex-end',
            justifyContent: 'center',
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#ffa',
          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#fff'}}>
            AMOUNT
          </Text>
          <TextInput
            style={{
              height: height * 0.05,
              width: width * 0.8,
              backgroundColor: '#fff',
            }}
          />
        </View>
        <View
          style={{
            height: height * 0.08,
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#ffa',
          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#fff'}}>
            MATURITY DATE
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.9,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                height: height * 0.05,
                width: width * 0.8,
                backgroundColor: '#fff',
              }}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <FontAwesome name="calendar" size={height * 0.03} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{height: height * 0.08,alignItems:'flex-end',justifyContent:'center',borderRadius: 10, borderWidth: 3, borderColor: "#ffa"}}>
                    <Text style={{fontWeight:'bold',padding:1, color:'#fff'}}>DURATION</Text>
                    <TextInput style={{height: height * 0.05, width: width * 0.8, backgroundColor:'#fff'}}/>
                </View> */}
        <View
          style={{
            height: height * 0.08,
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#ffa',
          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#fff'}}>
            PH.NO
          </Text>
          <TextInput
            style={{
              height: height * 0.05,
              width: width * 0.8,
              backgroundColor: '#fff',
            }}
          />
        </View>
        <View></View>
      </View>
      <View
        style={{
          height: height * 0.14,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
        }}>
        <TouchableOpacity
          style={{
            width: width * 0.5,
            height: height * 0.07,
            backgroundColor: '#287',
            borderRadius: height * 0.02,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: height * 0.03,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
