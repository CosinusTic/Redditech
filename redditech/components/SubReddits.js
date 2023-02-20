import SubComponent from './SubComponent';
import React, { Component, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, Image, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown'
function SubReddits(){
    const [subReddits, setSubReddits] = useState(undefined);
    const [searchInput, setSearchInput] = useState(null);
    const [subScriptions, setSubscriptions] = useState(undefined);
    const [subscriptionInput, setSubscriptionInput] = useState(undefined);
    const filters = ["Hot", "New", "Top ", "Random"]

    async function getNewSubReddits(){

        const token = await AsyncStorage.getItem('access_token');
        const requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Cookie": "csv=2; edgebucket=oV5eJDDssT8uwl3ZHS; loid=0000000000dfs2tff3.2.1626884096000.Z0FBQUFBQmp4b3BYVzlLREhxWkI3TGc5MTdTS0o3X29KTXJlelRMSWZIOUJfTEswMjJ1RW1WUWN5MkVwbGlzRUsybjdtNk5Kc195MnJJYXhqZFBqbmpRdDByMER4TzliaEJjdHRWSExwbU9pV0I0ZFFPWUgwTG9fYzFUV0FuSmU1NG1ZeGxvbGw2aXU; session_tracker=Jf86Lei4ldL71iUdAC.0.1674035491534.Z0FBQUFBQmp4OEVqS19HN1dPdFhxM3BpdGxKRldvZ3FFTmpfSndvZko0QkcyWHNnaTkyVnBsTTEtNEVUU0dQMDNSbFMwcmlMVm5fMnhMdzZhRVpobjZwN3Y0NnhEUnBlbGU0eWE1eHFSTFFzSEtSa2VaZnZuUngzSHFkR0pDcUVTVVI5bk15YWxKMXQ"
            },
            redirect: 'follow'
        };

        await fetch("https://oauth.reddit.com/subreddits/popular?limit=50&where=new", requestOptions)
            .then(response => response.json())
            .then(async(response) => {
                setSubReddits(response.data)
                let data = []
                for(let i = 0; i < response.data.children.length; i++){
                    // console.log(response.data.children[i].data)
                    data.push(response.data.children[i].data);
                }
                // for(let i = 0; i < data.length; i++){
                //     console.log(data[i].display_name_prefixed);
                // }
                setSubReddits(data);
            })
            .catch(error => console.log('error', error));
    }

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


    useEffect(() => {
        getNewSubReddits();
    }, [])

    return(
        subReddits ? 
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
            <SubComponent data={subReddits} />
        </View>
        :
        <View>
            <Text></Text>
        </View>
        
    )
    
}

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

export default SubReddits;