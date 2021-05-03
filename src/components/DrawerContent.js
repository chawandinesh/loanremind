import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {height, width} = Dimensions.get('window');
export default function DrawerContent(props) {
  const [active, setActive] = React.useState('Home');
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContainer}>
        <View style={styles.profileImageContainer}>
          <FontAwesome5 name="user-circle" size={height * 0.1} />
        </View>
        <View style={styles.drawerNavigationContainer}>
          <View style={styles.drawerItemsContainer}>
            <TouchableOpacity
              style={[
                {
                  ...styles.drawerItem,
                  backgroundColor: active === 'Home' ? '#898' : '#fff',
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Home');
                setActive('Home');
              }}>
              <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  ...styles.drawerItem,
                  backgroundColor: active === 'Profile' ? '#898' : '#fff',
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Profile');
                setActive('Profile');
              }}>
              <Text>Profile</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {marginTop: height * 0.05},
  profileImageContainer: {
    height: height * 0.14,
    width: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerNavigationContainer: {
    height: height * 0.75,
    justifyContent: 'space-between',
  },
  drawerItemsContainer: {
    width: width * 0.7,
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  drawerItem: {
    width: width * 0.7,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    width: width * 0.7,
    alignItems: 'center',
    backgroundColor: 'darkred',
    height: height * 0.06,
    justifyContent: 'center',
  },
  logoutText: {color: 'white', fontWeight: 'bold'},
});