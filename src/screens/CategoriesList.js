import React from 'react';
import {View, Text, Dimensions, FlatList} from 'react-native';
const {height, width} = Dimensions.get('window');
export default function CategoriesList(props) {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: '#34a8eb',
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
    });
  }, [props.navigation]);

  const renderItem = ({item, index}) => {
    return (
      <View
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
              Abc
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
              3982
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{height, width, backgroundColor: '#34a8eb'}}>
      <View style={{height: height * 0.92, width: width, alignItems: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[1, 3, 4, 5, 8]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
