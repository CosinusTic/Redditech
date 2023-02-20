import React, { Component, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, Image, ScrollView, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import PostComponent from './PostComponent';
import SelectDropdown from 'react-native-select-dropdown'


function Posts() {
    const [posts, setPosts] = useState(undefined);
    const [searchInput, setSearchInput] = useState(null);
    const [subScriptions, setSubscriptions] = useState(undefined);
    const [subscriptionInput, setSubscriptionInput] = useState(undefined);
    const [filterInput, setFilterInput] = useState(undefined);
    const filters = ["top", "controversial", "new", "random"];


    async function getUserSubscriptions() { //sub reddits the user is subbed to
        const token = await AsyncStorage.getItem('access_token');
        const requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            redirect: 'follow'
        }

        await fetch('https://oauth.reddit.com/subreddits/mine/?where=subscriber', requestOptions)
            .then((response) => response.json())
            .then(async (response) => {
                let data = []
                for (let i = 0; i < response.data.children.length; i++) {
                    data.push(response.data.children[i].data);
                }
                setSubscriptions(data);
            })
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
                console.log("data: ", data.subreddit);
            })
    }

    //functions for each filter with arg depending on input
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
        getUserSubscriptions();
    }, [])
    return (
        <>
            <SelectDropdown
                data={subScriptions}
                onSelect={(selectedItem) => {
                    // console.log(selectedItem.display_name_prefixed)
                    setSubscriptionInput(selectedItem.display_name_prefixed);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return 'Select a sub reddit'
                }}
                rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.display_name_prefixed
                }}
                defaultButtonText={'Your subscriptions'}
            />
            {subscriptionInput ?
                <View>
                    <Button
                        title={'Filter by ' + subscriptionInput}
                        onPress={() => {
                            console.log(subscriptionInput);
                            getFilteredSubPosts(subscriptionInput); //filtering function
                            // setSubscriptionInput(undefined);
                        }}
                    />
                </View>
                :
                <Text>No filter selected</Text>
            }
            {posts || subscriptionInput ?
                <SelectDropdown
                    data={filters}
                    onSelect={(item) => {
                        // console.log(item.display_name_prefixed)
                        setFilterInput(item);
                    }}
                    buttonTextAfterSelection={(item) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return 'Select a filter'
                    }}
                    rowTextForSelection={(item) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    defaultButtonText={'Select a filter'}
                />
                :
                <Text>No filter selected</Text>    
            }
            {
                filterInput ? 
                <Button
                        title={'Filter by ' + filterInput}
                        onPress={() => {
                            console.log(filterInput);
                            
                            //filtering function with input params
                            getFilteredSubFilteredPosts(subscriptionInput, filterInput);
                        }}
                />
                :
                <Text></Text>
            }
            <PostComponent data={posts} />
        </>
    )
}

export default Posts;