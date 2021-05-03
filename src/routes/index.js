import React from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import AddForm from '../screens/AddForm';
import DrawerContent from '../components/DrawerContent';
import ProfileScreen from '../screens/ProfileScreen';
import CategoriesList from '../screens/CategoriesList';
const {height, width} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      drawerStyle={{width: width * 0.7}}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default function index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeDrawer">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen
          name="HomeDrawer"
          component={HomeScreenDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddForm" component={AddForm} />
        <Stack.Screen name="CategoriesScreen" component={CategoriesList}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
