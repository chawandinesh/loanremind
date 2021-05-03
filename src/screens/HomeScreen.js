import React, {useState, useLayoutEffect, createRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');
export default function HomeScreen(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitle: 'Loan Remind',
      headerStyle: {
        backgroundColor: '#eb3489',
      },
    });
  }, [props.navigation]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.renderContainer}>
        <View style={styles.renderTopViewContainer}>
          <View>
            <Icon name="calendar-today" size={height * 0.05} />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: height * 0.03}}>02-04-2019</Text>
          </View>
        </View>
        <View style={styles.devider}></View>
        <View style={styles.renderBottomContainer}>
          <Text style={styles.renderBottomText}>Some data</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.pinkView}>
        <View style={styles.titleView}>
          <FlatList
            contentContainerStyle={{alignItems: 'center'}}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
      <View style={styles.whiteView}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate('AddForm')}>
          <View>
            <Icon name="add" size={height * 0.04} />
          </View>
          <View>
            <Text style={styles.buttonText}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate('CategoriesList')}>
          <View>
            <Icon name="menu" size={height * 0.04} />
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate("CategoriesScreen")}>
            <Text style={styles.buttonText}>Categories</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  pinkView: {
    height: height * 0.6,
    width,
    backgroundColor: '#eb3489',
    justifyContent: 'center',
    borderBottomRightRadius: height * 0.2,
  },
  whiteView: {
    height: height * 0.3,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    width: width * 0.7,
    height: height * 0.35,
    borderRadius: height * 0.05,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#078278',
  },
  buttonContainer: {
    width: width * 0.8,
    alignSelf: 'center',
    height: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f8a',
    marginTop: height * 0.02,
  },
  buttonText: {fontWeight: 'bold', fontSize: height * 0.04},
  renderContainer: {
    width: width * 0.7,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    height: height * 0.2,
    backgroundColor: '#ffa',
    alignItems: 'center',
  },
  renderTopViewContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  devider: {
    backgroundColor: '#000',
    height: 1,
    width: width * 0.45,
    alignSelf: 'center',
  },
  renderBottomContainer: {
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderBottomText: {color: '#f67', fontWeight: 'bold', fontSize: 22},
});
