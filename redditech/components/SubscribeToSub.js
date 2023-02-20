import SubComponent from './SubComponent';
import React, { Component, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, Image, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown'
import SubComponentSubscribe from './SubComponentSubscribe';

function SubScribeToSub(){
    const [subReddits, setSubReddits] = useState(undefined);
    const [searchInput, setSearchInput] = useState(null);

    async function getSearchedSubReddits(){
        const token = await AsyncStorage.getItem('access_token');
        const requestOptions = {
            method: 'GET', 
            headers: {
                'Authorization': 'Bearer ' + token, 
                "Cookie": "csv=2; edgebucket=oV5eJDDssT8uwl3ZHS; loid=0000000000dfs2tff3.2.1626884096000.Z0FBQUFBQmp4b3BYVzlLREhxWkI3TGc5MTdTS0o3X29KTXJlelRMSWZIOUJfTEswMjJ1RW1WUWN5MkVwbGlzRUsybjdtNk5Kc195MnJJYXhqZFBqbmpRdDByMER4TzliaEJjdHRWSExwbU9pV0I0ZFFPWUgwTG9fYzFUV0FuSmU1NG1ZeGxvbGw2aXU; session_tracker=mfllkpmafodmbfoepl.0.1674048377818.Z0FBQUFBQmp4X042akJvcXhCcWNiUTJTSGpNcGdiLUpkaTN1ZWJRTDJLbTRlRHpmZy1EbG8zOXR4eklxbFZJM3BGTWVVV0h0LVowWER0c2otY3h5bUxtNW1CTzQ3cWtFNGIzbUdISzVtRDBCRkstcmRkeVMwdEtZOFNCWldPZnJmbF9uaTRVbExZeHo"
            }, 
            redirect: 'follow'
        }
        await fetch('https://oauth.reddit.com/subreddits/search/?sort=relevance&q=' + searchInput, requestOptions)
            .then(response => response.json())
            .then(async(response) => {
                let data = []
                for (let i = 0; i < response.data.children.length; i++) {
                    data.push(response.data.children[i].data);
                }
                setSubReddits(data);
                console.log(data);
            })
            .catch(error => console.log('error', error));            
    }

    async function subscribe(subTitle){
        const url = 'https://oauth.reddit.com/api/subscribe?action=sub&sr_name=AskFrance';
        console.log(subTitle);
    }

    async function unSubscribe(){
        
    }



    return(
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setSearchInput}
                value={searchInput}
                placeholder={"search for sub reddits"}
            />
            <Text>{searchInput}</Text>
            <Button 
                title='Search'
                onPress={getSearchedSubReddits}
            />
            <SubComponentSubscribe data={subReddits} />
        </View>
    )
}
export default SubScribeToSub;

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: "black", 
      borderRadius: "10%"
    },
  });