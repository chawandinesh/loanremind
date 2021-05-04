import React from 'react';
import FirebaseAuth from '@react-native-firebase/auth';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default function LoginScreen(props) {
  const [auth, setAuth] = React.useState({email: '', password: ''});
  const handleSubmit = () => {
    FirebaseAuth()
      .signInWithEmailAndPassword(auth.email, auth.password)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
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
          onPress={() => handleSubmit()}
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
          onPress={() => props.navigation.navigate('SignUp')}
          style={{
            height: height * 0.06,
            width: width * 0.4,
            backgroundColor: '#959',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 4,
          }}>
          <Text style={{color: '#fff', fontSize: height * 0.03}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
