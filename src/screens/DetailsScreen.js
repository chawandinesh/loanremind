import React, {useEffect} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
export default function DetailsScreen(props) {
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  //   React.useEffect(() => {
  //     getInitialData();
  //   }, [props, isFocused]);
  const [details, setDetails] = React.useState({
    name: '',
    phno: '',
    amount: '',
    date: '',
  });

  const handleDelete = () => {
    firestore()
      .collection('usersdata')
      .doc(firebaseAuth().currentUser.uid)
      .collection('data')
      .doc(props.route.params.indexValue)
      .update({
        is_active: false,
      })
      .then(() => {
        console.log('User updated!');
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err, 'error');
      });
  };
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: '#323297',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
    });
  }, [props.navigation]);

  React.useEffect(() => {
    getInitialData();
    const {indexValue} = props.route.params;
    firestore()
      .collection('usersdata')
      .doc(firebaseAuth().currentUser.uid)
      .collection('data')
      .doc(props.route.params.indexValue)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.data(), 'abcdkd');
        setDetails(querySnapshot.data());
        // const dataItems = [];
        // querySnapshot.forEach(documentSnapshot => {
        //   dataItems.push(documentSnapshot.data());
        // });
        // setDetails(dataItems.filter((e) =>e.is_active)[indexValue]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props, isFocused]);
  return (
    <View style={{height, width, backgroundColor: '#323297'}}>
      <View style={{marginTop: height * 0.03}}>
        <View
          style={{
            width: width,
            height: height * 0.1,
            marginBottom: height * 0.02,
            backgroundColor: '#fa2',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            Name: {details.name}
          </Text>
        </View>
        <View
          style={{
            width: width,
            height: height * 0.1,
            marginBottom: height * 0.02,
            backgroundColor: '#fa2',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            Date: {details.date}
          </Text>
        </View>
        <View
          style={{
            width: width,
            height: height * 0.1,
            marginBottom: height * 0.02,
            backgroundColor: '#fa2',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            amount: {details.amount}
          </Text>
        </View>
        <View
          style={{
            width: width,
            height: height * 0.1,
            marginBottom: height * 0.02,
            backgroundColor: '#fa2',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            Ph.no: {details.phno}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: width,
          height: height * 0.3,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('AddForm', {
              details: details,
              docId: props.route.params.indexValue,
            })
          }
          style={{
            height: height * 0.06,
            width: width * 0.4,
            backgroundColor: '#343',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: height * 0.03}}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={{
            height: height * 0.06,
            width: width * 0.4,
            backgroundColor: 'darkred',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: height * 0.03}}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Text></Text>
    </View>
  );
}
