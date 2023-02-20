import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from "react-native";
import SubComponent from './SubComponent';
import Home from './Home';
import Test from './Test';
import AsyncStorage from '@react-native-async-storage/async-storage';


function MyWebView({navigation}) {
    const [display, setDisplay] = useState(true);
    const [access_token, setAccessToken] = useState(undefined);
    
    async function getToken(code) {
        const redirect_uri = 'http://localhost:19000';
        const details = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": redirect_uri
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const requestOptions = {
            method: 'POST',
            headers: {
                "Authorization": "Basic WEhiTkE4WHFNWldUQ3E1WHJtcjBhQTpIUElQME5hMTN0WVBYNjUydXdsSTlZV1JiekVTT0E=",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formBody,
            redirect: 'follow'
        };

        await fetch("https://www.reddit.com/api/v1/access_token/", requestOptions)
            .then((response) => response.json())
            .then(async (response) => {
                setAccessToken(response.access_token)
                await AsyncStorage.clear();
                await AsyncStorage.setItem('access_token', response.access_token);
                console.log("access token stored: ", response.access_token);
            })
            .catch(error => console.log('error', error));
    }

    return (
        

        display ?
            <WebView
                source={{ uri: 'https://www.reddit.com/api/v1/authorize.compact?client_id=XHbNA8XqMZWTCq5Xrmr0aA&response_type=code&state=123&redirect_uri=http://localhost:19000&duration=permanent&scope=identity read mysubreddits subscribe' }}
                onNavigationStateChange={(event) => {
                    if (event.url.includes('code=')) {
                        let code = event.url.split('=');
                        code = code[2].split('#');
                        code = code[0];
                        console.log("code: ", code.toString());
                        console.log("full URL: ", event.url)
                        getToken(code);
                        setDisplay(false);
                    }
                }}
            />
            :
            <View>
                {access_token ? <Text style={styles.home}>Connection successful</Text> : <Text>Loading...</Text> } 
                <View style={styles.buttons}>
                    <Button 
                        title='My Profile'
                        onPress={() => navigation.navigate('UserProfileTest')}
                    />
                    <Button 
                        title='Navigate'
                        onPress={() => navigation.navigate('SubReddits')}
                    />
                    <Button 
                        title='My subscriptions'
                        onPress={() => navigation.navigate('Posts')}
                    />
                    <Button 
                        title='Subscribe'
                        onPress={() => navigation.navigate('SubScribeToSub')}
                    />
                </View>
                
                
            </View> 

    );
}

export default MyWebView;


const styles = StyleSheet.create({
    home: {
        textAlign: 'center',
        fontSize: 20,
        margin: 30, 

        backgroundColor: 'green'
    }, 
    buttons: {
        borderWidth: 2, 
        borderColor: 'green', 
        borderRadius: '50%',
        margin: 50
    }
})