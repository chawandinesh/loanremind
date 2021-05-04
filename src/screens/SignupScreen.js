import React from 'react';
import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default function SignupScreen(props) {
  const [auth, setAuth] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const register = () => {
    firebaseAuth()
      .createUserWithEmailAndPassword(auth.email, auth.password)
      .then(res => {
        firestore()
          .collection('users')
          .doc(firebaseAuth().currentUser.uid)
          .set({
            name: auth.name,
            email: auth.email,
          });
      })
      .catch(err => {
        console.log(err, 'err');
      });
  };
  return (
    <View
      style={{
        height: height * 0.7,
        width,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: width * 0.7,
          height: height * 0.1,
          backgroundColor: '#2a7',
        }}>
        <Text>Name</Text>
        <TextInput
          style={{
            backgroundColor: '#fff',
            padding: 10,
            width: width * 0.68,
            alignSelf: 'center',
          }}
          onChangeText={text =>
            setAuth({
              ...auth,
              name: text,
            })
          }
          placeholder="Name.."
        />
      </View>
      <View
        style={{
          width: width * 0.7,
          height: height * 0.1,
          backgroundColor: '#2a7',
        }}>
        <Text>Email</Text>
        <TextInput
          onChangeText={text => setAuth({...auth, email: text})}
          style={{
            backgroundColor: '#fff',
            padding: 10,
            width: width * 0.68,
            alignSelf: 'center',
          }}
          placeholder="Email.."
        />
      </View>
      <View
        style={{
          width: width * 0.7,
          height: height * 0.1,
          backgroundColor: '#2a7',
        }}>
        <Text>Password</Text>
        <TextInput
          onChangeText={text => setAuth({...auth, password: text})}
          style={{
            backgroundColor: '#fff',
            padding: 10,
            width: width * 0.68,
            alignSelf: 'center',
          }}
          placeholder="Password.."
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => register()}
          style={{
            height: height * 0.06,
            width: width * 0.4,
            backgroundColor: '#259',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 4,
          }}>
          <Text style={{color: '#fff', fontSize: height * 0.03}}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          style={{
            height: height * 0.06,
            width: width * 0.4,
            backgroundColor: '#959',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 4,
          }}>
          <Text style={{color: '#fff', fontSize: height * 0.03}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
