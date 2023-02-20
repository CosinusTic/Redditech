import React, { Component, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, Image, ScrollView, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Item = ({title, navigation, type}) => (
  
  <>
  <View style={{margin: 20}}>
    <Button 
      style={styles.title} 
      title={title}
      onPress={async() => {
        await AsyncStorage.setItem('subInput', title);
        navigation.navigate('PostsFromSubSearch')
      }}
    />
    <Button 
      style={styles.title} 
      title={'Get info'}
      onPress={async() => {
        await AsyncStorage.setItem('subInput', title);
        navigation.navigate('SubRedditInfoComponent')
      }}
    />
    <Text style={{textAlign: 'center'}}>Type: {type}</Text>
    </View>
  </>
);

function SubComponent({ data }) {
  const [distanceFromEnd, setDistanceFromEnd] = useState(0.7);
  const navigation = useNavigation(); 
  return (
    <>
      {data ?
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => 
              <Item 
                title={item.display_name_prefixed} 
                url={item.banner_background_image} 
                navigation={navigation}
                type={item.subreddit_type}
              />}
            keyExtractor={item => item.id} 
            onEndReachedThreshold={distanceFromEnd}
            onEndReached={() => setDistanceFromEnd(5)}
          />

        </View>
        :
        <View>
          <Text>Problem with fetching data</Text>
        </View>

      }
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
  },
  stretch: {
    width: 150,
    height: 120,
    resizeMode: 'stretch',
  },
});


export default SubComponent;