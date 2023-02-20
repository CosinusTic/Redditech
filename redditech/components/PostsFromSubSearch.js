// The page that pops when you click on a sub reddit from the subreddits page
import React, { Component, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, Image, ScrollView, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import PostComponent from './PostComponent';
import SelectDropdown from 'react-native-select-dropdown'


function PostFromSubSearch(){
    const [posts, setPosts] = useState(undefined);
    const [subInput, setSubInput] = useState(undefined);
    const [filterInput, setFilterInput] = useState(undefined);
    const filters = ["top", "controversial", "new", "random"];

    async function getLocalStorageSubInput(){
        const localStorageItem = await AsyncStorage.getItem('subInput');
        if(localStorageItem){
            console.log('local storage item: ', localStorageItem)
            setSubInput(localStorageItem);
            AsyncStorage.removeItem('subInput');
        }
        else{
            console.log('no input stacked in local storage')
        }
    }

    async function getFilteredSubPosts(input){
        await fetch('https://www.reddit.com/' + input + '/.json')
            .then((response) => response.json())
            .then(async(response) => {
                let data = []
                for (let i = 0; i < response.data.children.length; i++) {
                    data.push(response.data.children[i].data);
                }
                setPosts(data);
            })
    }

    //functions for each filter
    async function getFilteredSubFilteredPosts(filteredSub, postFilterToApply){
        const token = await AsyncStorage.getItem('access_token');
        const requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "csv=2; edgebucket=oV5eJDDssT8uwl3ZHS; loid=0000000000dfs2tff3.2.1626884096000.Z0FBQUFBQmp4b3BYVzlLREhxWkI3TGc5MTdTS0o3X29KTXJlelRMSWZIOUJfTEswMjJ1RW1WUWN5MkVwbGlzRUsybjdtNk5Kc195MnJJYXhqZFBqbmpRdDByMER4TzliaEJjdHRWSExwbU9pV0I0ZFFPWUgwTG9fYzFUV0FuSmU1NG1ZeGxvbGw2aXU; session_tracker=enngpimojkeqdnkebh.0.1674207773233.Z0FBQUFBQmp5bUlkdmpFc0JsTV91UzJBRjJ4R2IzLTRfWUN4OUJTOEd3WWs0NnZlRFg4UUFtU2RnMzMtVXNGZnFtU0M0QXppN3N3Q1FnSmdFOXhNazNUdktQX0djXzRBXzdKQWVtZHBsbzNMZW9SM0ttUXJic0FjNnhTUnpXWEFoTGRScDBlTi1za2I; token_v2=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQyMTE3NjcsInN1YiI6Ii1HbzFfT3JKb2J5MHBieF9qZWZrUGN2V25ZcFRpdnciLCJsb2dnZWRJbiI6ZmFsc2UsInNjb3BlcyI6WyIqIiwiZW1haWwiLCJwaWkiXX0.8LaLXhA7sTWu6C55pWO-F9vb5apjFA0f6M-OfzVK8f8"
            },
            redirect: 'follow'
        }
        await fetch('https://oauth.reddit.com/' + filteredSub + '/' + postFilterToApply, requestOptions)
            .then((response) => response.json())
            .then(async(response) => {
                let data = []
                for (let i = 0; i < response.data.children.length; i++) {
                    data.push(response.data.children[i].data);
                }
                setPosts(data);
            })
        console.log({'link': 'https://oauth.reddit.com/' + filteredSub + '/' + postFilterToApply, 'token': token});
    }

    useEffect(() => {
        getLocalStorageSubInput();
        if(subInput){
            getFilteredSubPosts(subInput);
        }
    }, [subInput])


    return(
        <>
            {subInput ?
                (posts ? 
                    <View>
                        <SelectDropdown
                            data={filters}
                            onSelect={(selectedItem) => {
                                setFilterInput(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return 'Select a filter'
                            }}
                            rowTextForSelection={(item) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            defaultButtonText={'Filter posts'}
                        />
                        {filterInput ?
                            <View>
                                <Button
                                    title={'Filter by ' + filterInput}
                                    onPress={() => {
                                        console.log(filterInput);
                                        //filtering function
                                        getFilteredSubFilteredPosts(subInput, filterInput);
                                    }}
                                />
                            </View>
                            :
                            <Text>No filter selected</Text>
                        }
                        <PostComponent data={posts} />
                    </View>
                :
                    <View>
                        <Text>Error fetching data</Text>
                    </View>
                )
                :
                <Text>No Subreddit selected</Text>
            }
        </>
    )
}

export default PostFromSubSearch;