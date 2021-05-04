import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const {height, width} = Dimensions.get('window');
export default function ProfileScreen(props) {
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
    firestore()
      .collection('users')
      .doc(firebaseAuth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
        setProfileInfo(documentSnapshot.data());
      });
  }, []);
  return (
    <View style={{height, width}}>
      <View style={styles.profileImageContainer}>
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
            backgroundColor: '#ea0',
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
            <Text style={{fontSize: height * 0.03}}>10</Text>
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
            <Text style={{fontSize: height * 0.03}}>4</Text>
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
            <Text style={{fontSize: height * 0.03, color: '#fff'}}>10</Text>
          </View>
        </View>
      </View>
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
