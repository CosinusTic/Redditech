import React, { Component, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, Image, ScrollView, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function subscribe(subTitle){
  const token = await AsyncStorage.getItem('access_token');
  const requestOptions = {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + token,
      "Cookie": "csv=2; edgebucket=oV5eJDDssT8uwl3ZHS; loid=0000000000dfs2tff3.2.1626884096000.Z0FBQUFBQmp4b3BYVzlLREhxWkI3TGc5MTdTS0o3X29KTXJlelRMSWZIOUJfTEswMjJ1RW1WUWN5MkVwbGlzRUsybjdtNk5Kc195MnJJYXhqZFBqbmpRdDByMER4TzliaEJjdHRWSExwbU9pV0I0ZFFPWUgwTG9fYzFUV0FuSmU1NG1ZeGxvbGw2aXU; session_tracker=iakjdeeppqdbiigkdq.0.1674210455785.Z0FBQUFBQmp5bXlYeU1NdGpTUDJpZGN5aFZXbUY0WjkyNWhLMmJWUU52NGdZTkt6WmpkUFAtbHVMWjRTSkFacEV0VHFMZHJuME9DQW5uenpwOXhscnF4QjVfS3hpT0ZDSktndXh2VElucUkyTWVzV1ZNRURUWS1ITzlJTFRXeHd0MjZjM3Ffd3NaSjM; token_v2=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQyMTE3NjcsInN1YiI6Ii1HbzFfT3JKb2J5MHBieF9qZWZrUGN2V25ZcFRpdnciLCJsb2dnZWRJbiI6ZmFsc2UsInNjb3BlcyI6WyIqIiwiZW1haWwiLCJwaWkiXX0.8LaLXhA7sTWu6C55pWO-F9vb5apjFA0f6M-OfzVK8f8"
    },
    redirect: 'follow'
  }

  await fetch('https://oauth.reddit.com/api/subscribe?action=sub&sr_name=' + subTitle, requestOptions)
    .then((response) => response.json())
    .then(async(response) => {
      console.log('response: ', response);
      if(!response.error){
        alert('Subscribed to ' + subTitle)
        console.log('Subscribed to ' + subTitle)
      }
    })
    .catch((error) => console.log(error)) 

  console.log('input :', subTitle);
}

async function unSubscribe(subTitle){
  const token = await AsyncStorage.getItem('access_token');
  const requestOptions = {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + token,
      "Cookie": "csv=2; edgebucket=oV5eJDDssT8uwl3ZHS; loid=0000000000dfs2tff3.2.1626884096000.Z0FBQUFBQmp4b3BYVzlLREhxWkI3TGc5MTdTS0o3X29KTXJlelRMSWZIOUJfTEswMjJ1RW1WUWN5MkVwbGlzRUsybjdtNk5Kc195MnJJYXhqZFBqbmpRdDByMER4TzliaEJjdHRWSExwbU9pV0I0ZFFPWUgwTG9fYzFUV0FuSmU1NG1ZeGxvbGw2aXU; session_tracker=iakjdeeppqdbiigkdq.0.1674210455785.Z0FBQUFBQmp5bXlYeU1NdGpTUDJpZGN5aFZXbUY0WjkyNWhLMmJWUU52NGdZTkt6WmpkUFAtbHVMWjRTSkFacEV0VHFMZHJuME9DQW5uenpwOXhscnF4QjVfS3hpT0ZDSktndXh2VElucUkyTWVzV1ZNRURUWS1ITzlJTFRXeHd0MjZjM3Ffd3NaSjM; token_v2=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQyMTE3NjcsInN1YiI6Ii1HbzFfT3JKb2J5MHBieF9qZWZrUGN2V25ZcFRpdnciLCJsb2dnZWRJbiI6ZmFsc2UsInNjb3BlcyI6WyIqIiwiZW1haWwiLCJwaWkiXX0.8LaLXhA7sTWu6C55pWO-F9vb5apjFA0f6M-OfzVK8f8"
    },
    redirect: 'follow'
  }

  await fetch('https://oauth.reddit.com/api/subscribe?action=unsub&sr_name=' + subTitle, requestOptions)
    .then((response) => response.json())
    .then(async(response) => {
      if(!response.error){
        alert('Ubsubscribed from' + subTitle)
        console.log('Ubsubscribed from ' + subTitle)

      }
    })
    .catch((error) => console.log(error)) 

  console.log('input :', subTitle);
}
const Item = ({name, title, navigation, type}) => (
  
  <>
  <View style={{margin: 20}}>
    <Button 
      style={styles.title} 
      title={name}
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
    <Button 
        style={styles.title}
        title={'Subscribe to ' + name}
        onPress={async () => {
          subscribe(name);
        }}
    />
    <Button 
        style={styles.title}
        title={'Unsubscribe from ' + name}
        onPress={async () => {
          unSubscribe(name);
        }}
    />
    <Text style={{textAlign: 'center'}}>Type: {type}</Text>
  </View>
  </>
);

function SubComponentSubscribe({ data }) {
  const [distanceFromEnd, setDistanceFromEnd] = useState(0.7);
  const navigation = useNavigation(); 

  
  return (
    <>
      {data ?
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => 
            <View>
              <Item 
                name={item.display_name_prefixed} 
                url={item.banner_background_image} 
                navigation={navigation}
                type={item.subreddit_type}
                title={item.title}
              />
              
            </View>
            }
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


export default SubComponentSubscribe;