
import React, { Component, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, Image, ScrollView, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Item = ({title, subscribers, pic_url, display_name, description, background_color}) => (
  <>
  <View style={{"backgroundColor": background_color}}>
    <Text style={styles.title}>{title}</Text>
    
    { pic_url !== null? 
    <Image
      source={{ uri: pic_url }}
      style={styles.small_img}
    />
    :
    <Text>No picture</Text>
    }
    <Text>subscribers: {subscribers}</Text>
    <Text>Display Name: {display_name}</Text>
    <Text>Sub description: {description}</Text>
    </View>
  </>
  );
function SubRedditInfoComponent(){
  const [subRedditInfo, setSubRedditInfo] = useState(undefined);
  const [distanceFromEnd, setDistanceFromEnd] = useState(0.7);

  async function getSubRedditInfo(){
    const token = await AsyncStorage.getItem('access_token');
    const subRedditName = await AsyncStorage.getItem('subInput');
    
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        "Cookie": "csv=2; edgebucket=oV5eJDDssT8uwl3ZHS; loid=0000000000dfs2tff3.2.1626884096000.Z0FBQUFBQmp4b3BYVzlLREhxWkI3TGc5MTdTS0o3X29KTXJlelRMSWZIOUJfTEswMjJ1RW1WUWN5MkVwbGlzRUsybjdtNk5Kc195MnJJYXhqZFBqbmpRdDByMER4TzliaEJjdHRWSExwbU9pV0I0ZFFPWUgwTG9fYzFUV0FuSmU1NG1ZeGxvbGw2aXU; session_tracker=mfllkpmafodmbfoepl.0.1674048377818.Z0FBQUFBQmp4X042akJvcXhCcWNiUTJTSGpNcGdiLUpkaTN1ZWJRTDJLbTRlRHpmZy1EbG8zOXR4eklxbFZJM3BGTWVVV0h0LVowWER0c2otY3h5bUxtNW1CTzQ3cWtFNGIzbUdISzVtRDBCRkstcmRkeVMwdEtZOFNCWldPZnJmbF9uaTRVbExZeHo"
      },
      redirect: 'follow'
    }
    await fetch('https://oauth.reddit.com/subreddits/search/?sort=relevance&q=' + subRedditName, requestOptions)
      .then(response => response.json())
      .then(async (response) => {
        let data = []
        for (let i = 0; i < response.data.children.length; i++) {
          data.push(response.data.children[i].data);
        }
        let filteredSub = data.filter(element => element.display_name_prefixed == subRedditName)
        setSubRedditInfo(filteredSub);
      })
      .catch(error => console.log('error', error)); 
  }

  useEffect(() => {
    getSubRedditInfo();
  }, [])

  return (
    <>
      {subRedditInfo ?
        <View>
          <FlatList
            data={subRedditInfo}
            renderItem={({ item }) => 
              <Item 
                title={item.display_name_prefixed} 
                pic_url={item.header_img}
                background_color={item.icon_img}
                subscribers={item.subscribers}
                description={item.public_description}
                display_name={item.display_name}
              />}
            keyExtractor={item => item.id} 
            onEndReachedThreshold={distanceFromEnd}
            onEndReached={() => setDistanceFromEnd(5)}
          />

        </View>
        :
        <View>
          <Text>Loading...</Text>
        </View>

      }
    </>)
}
export default SubRedditInfoComponent;


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
    fontSize: 25,
  },
  stretch: {
    width: 150,
    height: 120,
    resizeMode: 'stretch',
  },
  small_img:{
    width: 100, 
    height: 80, 
    resizeMode: 'stretch',
    borderRadius:'20%'
    
  }, 
  bg_img: {
    width: 300, 
    height: 80, 
    resizeMode: 'stretch'
  }
});