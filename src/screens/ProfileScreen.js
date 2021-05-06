import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebaseAuth from '@react-native-firebase/auth';
import {Tooltip} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
export default function ProfileScreen(props) {
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const [data, setData] = useState([]);
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
      headerStyle: {
        backgroundColor:'#6beb34',
      },
      headerTitle: ''
    });
  }, [props.navigation]);
  const [profileInfo, setProfileInfo] = React.useState({
    name: '',
    email: '',
  });
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
    });
  }, [props]);
  React.useEffect(() => {
    getInitialData();
    if (firebaseAuth().currentUser) {
      firestore()
        .collection('users')
        .doc(firebaseAuth().currentUser.uid)
        .onSnapshot(documentSnapshot => {
          setProfileInfo(documentSnapshot.data());
        });
      firestore()
        .collection('usersdata')
        .doc(firebaseAuth().currentUser.uid)
        .collection('data')
        .get()
        .then(querySnapshot => {
          const dataItems = [];
          querySnapshot.forEach(documentSnapshot => {
            dataItems.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setData(dataItems);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [props, isFocused]);

  return (
    <View style={{height, width}}>
      <View
        style={{
          height: height * 0.16,
          width: height * 0.16,
          alignItems: 'center',
          zIndex: 13,
          justifyContent: 'center',
          backgroundColor: '#fff',
          elevation: 3,
          position: 'absolute',
          top: height * 0.17,
          left: width * 0.35,
          borderRadius: height * 0.3,
        }}>
          <TouchableOpacity>

        <Icon name="user-circle" size={height * 0.1} />
          </TouchableOpacity>
      </View>
      <View
        style={{
          height: height * 0.25,
          width,
          backgroundColor: '#6beb34',
          borderBottomRightRadius: height * 0.1,
          borderBottomLeftRadius: height * 0.1,
        }}>
          <Text style={{fontWeight:'bold', fontSize: height * 0.04,marginTop: height * 0.05, marginLeft: height * 0.03}}>Profile</Text>
        </View>
      <View style={{height: height * 0.7, width, zIndex: 0}}>
        <View
          style={{
            width: width * 0.98,
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            height: height * 0.7,
            borderRadius: height * 0.1,
            position: 'absolute',
            zIndex: 0,
            elevation: 4,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.9,
              alignSelf: 'center',
              elevation: 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ddd',
              borderTopWidth: 6,
              borderTopColor:'#6beb34'
            }}>
            <Text style={{fontSize: height * 0.024, fontWeight: 'bold'}}>
              User Name: {profileInfo.name}
            </Text>
          </View>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.9,
              alignSelf: 'center',
              elevation: 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ddd',
              borderTopWidth: 4,
              borderTopColor:'#6beb34'
            }}>
            <Text style={{fontSize: height * 0.024, fontWeight: 'bold'}}>
              Email ID: {profileInfo.email}
            </Text>
          </View>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.9,
              alignSelf: 'center',
              elevation: 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ddd',
              borderTopWidth: 4,
              borderTopColor:'#6beb34'
            }}>
            <Text style={{fontSize: height * 0.024, fontWeight: 'bold'}}>
              Currency Used:
            </Text>
          </View>

          <View
            style={{
              height: height * 0.1,
              width: width * 0.9,
              alignSelf: 'center',
              elevation: 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ddd',
              borderTopWidth: 4,
              borderTopColor:'#6beb34'
            }}>
            <Text style={{fontSize: height * 0.024, fontWeight: 'bold'}}>
              Change password:
              <Text style={{fontWeight: 'bold', color: '#783783'}}>Change</Text>
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.profileImageContainer}>
        <Icon name="user-circle" size={height * 0.1} />
      </View>
      <View style={styles.userNameContainer}>
        <Text style={styles.userName}>{profileInfo.name}</Text>
      </View>
      <View style={styles.summary}>
        <View
          style={{
            height: height * 0.6,
            padding: height * 0.02,
            width: width * 0.95,
            justifyContent: 'space-around',
            borderRadius: height * 0.1,
            backgroundColor: '#77ee33',
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: width * 0.7,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: height * 0.03}}>Collected</Text>
            <Text style={{fontSize: height * 0.03}}>:</Text>
            <Text style={{fontSize: height * 0.03}}>{data.filter((e) => !e.is_active).length}</Text>
          </View>
          <View
            style={{
              width: width * 0.7,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: height * 0.03}}>Pending</Text>
            <Text style={{fontSize: height * 0.03}}>:</Text>
            <Text style={{fontSize: height * 0.03}}>{data.filter((e) => e.is_active).length}</Text>
          </View>
          <View
            style={{
              width: width * 0.9,
              padding: 10,
              alignSelf: 'center',
              backgroundColor: '#232',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: height * 0.03, color: '#fff'}}>Total</Text>
            <Text style={{fontSize: height * 0.03, color: '#fff'}}>:</Text>
            <Text style={{fontSize: height * 0.03, color: '#fff'}}>{data.length}</Text>
          </View>
        </View>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  profileImageContainer: {
    height: height * 0.14,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: height * 0.04,
    color: '#fff',
  },
  userNameContainer: {
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    backgroundColor: '#728',
  },
  summary: {
    height: height * 0.7,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
