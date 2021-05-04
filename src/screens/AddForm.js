import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');
export default function AddForm(props) {
  const [formState, setFormState] = useState({
    name: '',
    amount: '',
    date: '',
    phno: '',
    is_active: true,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setFormState({...formState, date: moment(date).format('DD-MM-YYYY')});
    hideDatePicker();
  };

  React.useEffect(() => {
    console.log(props.route.params)

    if (props.route.params !== undefined) {
      setFormState(props.route.params.details);
    }
  }, []);

  const handleSubmit = () => {
    console.log(formState, 'formState');
    if (props.route.params) {
      firestore()
        .collection('usersdata')
        .doc(firebaseAuth().currentUser.uid)
        .collection('data')
        .doc(props.route.params.docId)
        .update(formState)
        .then(res => {
          console.log('updated');
          setFormState({
            name: '',
            amount: '',
            date: '',
            phno: '',
          });
          props.navigation.goBack()
        })
        .catch(err => {
          console.log('failed to update');
        });
    } else {
      firestore()
        .collection('usersdata')
        .doc(firebaseAuth().currentUser.uid)
        .collection('data')
        .add(formState)
        .then(res => {
          setFormState({
            name: '',
            amount: '',
            date: '',
            phno: '',
          });
          props.navigation.goBack()
        })
        .catch(err => {
          console.log(err);
        });
    }
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
    <KeyboardAwareScrollView style={{height, width}}>
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
            placeholder="enter name"
            value={formState.name}
            onChangeText={text => setFormState({...formState, name: text})}
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
            value={formState.amount}
            placeholder="enter amount"
            onChangeText={text => setFormState({...formState, amount: text})}
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
              placeholder="Select date"
              value={formState.date}
              editable={false}
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
            onChangeText={text => setFormState({...formState, phno: text})}
            value={formState.phno}
            placeholder="Enter ph no"
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
          onPress={() => handleSubmit()}
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
    </KeyboardAwareScrollView>
  );
}
