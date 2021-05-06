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
    category: props.route.params.category,
    is_active: true,
    interest: '',
    notes: '',
    duedate: '',
  });
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDueDatePickerVisible, setIsDueDatePickerVisible] = React.useState(
    false,
  );
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

  const showdueDatePicker = () => {
    setIsDueDatePickerVisible(true);
  };

  const hidedueDatePicker = () => {
    setIsDueDatePickerVisible(false);
  };

  const handledueDateConfirm = date => {
    setFormState({...formState, duedate: moment(date).format('DD-MM-YYYY')});
    hidedueDatePicker();
  };

  React.useEffect(() => {
    if (props.route.params.hasOwnProperty('details')) {
      setFormState(props.route.params.details);
    }
  }, []);
  console.log(props.route.params, 'in Add')

  const handleSubmit = () => {
    if (props.route.params.hasOwnProperty('docId')) {
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
            category: props.route.params.category,
            is_active: true,
            interest: '',
            notes: '',
            duedate: '',
          });
          props.navigation.goBack();
        })
        .catch(err => {
          console.log(err, 'failed to update');
        });
    } else {
      console.log('userdata', firebaseAuth().currentUser.uid, props.route.params)
      firestore()
        .collection('usersdata')
        .doc(firebaseAuth().currentUser.uid)
        .collection('data')
        .add(formState)
        .then(res => {
          console.log(res)
          setFormState({
            name: '',
            amount: '',
            date: '',
            phno: '',
            category: props.route.params.category,
            is_active: true,
            interest: '',
            notes: '',
            duedate: '',
          });
          props.navigation.goBack();
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
      headerStyle: {backgroundColor: '#46eb34'},
      headerTintColor: '#000',
    });
  }, [props.navigation]);
  return (
    <KeyboardAwareScrollView style={{height, width}}>
      <View
        style={{
          height: height * 0.8,
          width,
          justifyContent: 'space-evenly',
          backgroundColor: '#fff',
          borderBottomRightRadius: height * 0.01,
          borderBottomLeftRadius: height * 0.01,
        }}>
        {/* <Text
          style={{color: '#fff', textAlign: 'center', fontSize: height * 0.03}}>
          {moment(new Date()).format('DD-MM-YYYY')}
        </Text> */}
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopWidth: 5,
            borderTopColor:'#46eb34',
            // borderColor: '#ffa',
            backgroundColor:'#ddd',
            height: height * 0.1,
          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#000'}}>
            Member Name
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
            alignItems: 'flex-end',
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopWidth: 5,
            borderTopColor:'#46eb34',
            backgroundColor:'#ddd',
            height: height * 0.1,
          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#000'}}>
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
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopWidth: 5,
            borderTopColor:'#46eb34',
            backgroundColor:'#ddd',
            height: height * 0.1,
          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#000'}}>
            GIVEN DATE
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
            alignItems: 'flex-end',
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopWidth: 5,
            borderTopColor:'#46eb34',
            backgroundColor:'#ddd',
            height: height * 0.1,
          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#000'}}>
            PHONE.NO
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

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopWidth: 5,
            borderTopColor:'#46eb34',
            backgroundColor:'#ddd',
            height: height * 0.1,          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#000'}}>
            DUE DATE
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
              value={formState.duedate}
              editable={false}
              style={{
                height: height * 0.05,
                width: width * 0.8,
                backgroundColor: '#fff',
              }}
            />
            <TouchableOpacity onPress={showdueDatePicker}>
              <FontAwesome name="calendar" size={height * 0.03} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopWidth: 5,
            borderTopColor:'#46eb34',
            backgroundColor:'#ddd',
            height: height * 0.1,
          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#000'}}>
            MONTHLY INTREST
          </Text>
          <TextInput
            onChangeText={text => setFormState({...formState, interest: text})}
            value={formState.interest}
            placeholder="Enter interest"
            style={{
              height: height * 0.05,
              width: width * 0.8,
              backgroundColor: '#fff',
            }}
          />
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopWidth: 5,
            borderTopColor:'#46eb34',
            backgroundColor:'#ddd',
            height: height * 0.1,
          }}>
          <Text style={{fontWeight: 'bold', padding: 1, color: '#000'}}>
            Notes
          </Text>
          <TextInput
            onChangeText={text => setFormState({...formState, notes: text})}
            value={formState.notes}
            placeholder="Enter notes"
            style={{
              height: height * 0.05,
              width: width * 0.8,
              backgroundColor: '#fff',
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: height * 0.12,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
        }}>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            width: width * 0.5,
            height: height * 0.07,
            borderBottomWidth: 3,
            backgroundColor: '#46eb34',
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

      <DateTimePickerModal
        isVisible={isDueDatePickerVisible}
        mode="date"
        onConfirm={handledueDateConfirm}
        onCancel={hidedueDatePicker}
      />
    </KeyboardAwareScrollView>
  );
}
