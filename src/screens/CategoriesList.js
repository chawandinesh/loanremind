import React, {useState} from 'react';
import {View, Text, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
export default function CategoriesList(props) {
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const [data, setData] = useState([]);
  console.log(props.route.params, 'routes..');
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleAlign: 'center',
      headerTintColor: '#000',
    });
  }, [props.navigation]);

  React.useEffect(() => {
    getInitialData();
    firestore()
      .collection('usersdata')
      .doc(firebaseAuth().currentUser.uid)
      .collection('data')
      .get()
      .then(querySnapshot => {
        const dataItems = [];
        querySnapshot.forEach(documentSnapshot => {
          dataItems.push({...documentSnapshot.data(), id: documentSnapshot.id});
        });
        setData(dataItems);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props, isFocused]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('DetailsScreen', {
            indexValue: item.id,
            category: props.route.params.category,
          })
        }
        style={{
          width: width * 0.9,
          borderTopColor: '#41cc44',
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 3,
          elevation: 3,
          // alignItems: 'center',
          borderTopWidth: 10,
          height: height * 0.2,
          backgroundColor: '#fff',
          // justifyContent: 'space-around',
          borderBottomRightRadius: height * 0.03,
          borderBottomLeftRadius: height * 0.03,
          marginBottom: 10,
        }}>
        <View style={{marginLeft: width * 0.1, paddingTop: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: height * 0.026}}>
            {item.name}
          </Text>
        </View>
        <View style={{marginLeft: width * 0.1, paddingTop: 10}}>
          <Text style={{fontSize: height * 0.023, color: 'gray'}}>
            Interest: {item.interest}
          </Text>
        </View>
        <View style={{marginLeft: width * 0.1, paddingTop: 10}}>
          <Text style={{fontSize: height * 0.023, color: 'gray'}}>
            Due Date: {item.duedate}
          </Text>
        </View>
        <View
          style={{
            marginRight: width * 0.05,
            paddingTop: 10,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: height * 0.023,
              color: 'gray',
              fontWeight: 'bold',
              color: '#890',
            }}>
            Amount: {item.amount}
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            width: width * 0.7,
            justifyContent: 'space-around',
          }}>
          <View>
            <Text style={{fontSize: height * 0.025, fontWeight: 'bold'}}>
              Name
            </Text>
          </View>
          <View>
            <Text style={{fontSize: height * 0.025, fontWeight: 'bold'}}>
              :
            </Text>
          </View>
          <View>
            <Text style={{fontSize: height * 0.025, fontWeight: 'bold'}}>
              {item.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: width * 0.7,
            justifyContent: 'space-around',
          }}>
          <View>
            <Text style={{fontSize: height * 0.025, fontWeight: 'bold'}}>
              Amount
            </Text>
          </View>
          <View>
            <Text style={{fontSize: height * 0.025, fontWeight: 'bold'}}>
              :
            </Text>
          </View>
          <View>
            <Text style={{fontSize: height * 0.025, fontWeight: 'bold'}}>
              {item.amount}
            </Text>
          </View>
        </View> */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={{height, width, backgroundColor: '#ddd'}}>
      <View style={{height: height * 0.92, width: width, alignItems: 'center'}}>
        {data
          .filter(e => e.is_active)
          .filter(e => e.category === props.route.params.category).length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data
              .filter(e => e.is_active)
              .filter(e => e.category === props.route.params.category)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{
              height: height * 0.3,
              width: width * 0.9,
              borderRadius: height * 0.04,
              borderWidth: 3,
              marginTop: height * 0.3,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: height * 0.03,
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: '#003',
              }}>
              No Loans to Pay
            </Text>
          </View>
        )}
      </View>
        <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('AddForm', {
            category: props.route.params.category,
          })
        }}
          style={{
            width: height * 0.08,
            height: height * 0.08,
            borderRadius: height * 0.02,
            elevation: 5,
            zIndex: 3,
            position:'absolute',
            bottom: height * 0.1, 
            right: 20,
            shadowColor: '#000',
            shadowOffset: {height: 1, width: 1},
            shadowOpacity: 0.5,
            backgroundColor:'#41cc44',
            shadowRadius: 5,
            alignItems:'center',
            justifyContent:'center'
          }}>
          <Text style={{fontWeight: "bold", fontSize: height * 0.05, textAlign:'center'}}>+</Text>
        </TouchableOpacity>
    </View>
  );
}
