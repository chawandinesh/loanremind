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
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: '#34a8eb',
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
    });
  }, [props.navigation]);
  console.log(data);

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
          props.navigation.navigate('DetailsScreen', {indexValue: item.id})
        }
        style={{
          width: width * 0.9,
          alignItems: 'center',
          borderTopWidth: 10,
          height: height * 0.2,
          backgroundColor: '#fff',
          justifyContent: 'space-around',
          borderBottomRightRadius: height * 0.03,
          borderBottomLeftRadius: height * 0.03,
          marginBottom: 10,
        }}>
        <View
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
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{height, width, backgroundColor: '#34a8eb'}}>
      <View style={{height: height * 0.92, width: width, alignItems: 'center'}}>
        {data.filter(e => e.is_active).length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.filter(e => e.is_active)}
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
                color: '#fff',
              }}>
              No Data
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
