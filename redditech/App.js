import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home.js';
import SubComponent from './components/SubComponent'
import MyWebView from './components/WebView.js';
import UserProfileTest from './components/UserProfileTest.js';
import SubReddits from './components/SubReddits.js';
import PostComponent from './components/PostComponent.js';
import Posts from './components/Posts.js';
import PostFromSubSearch from './components/PostsFromSubSearch.js';
import SubRedditInfoComponent from './components/SubRedditInfoComponent.js';
import SubScribeToSub from './components/SubscribeToSub.js';
import SubComponentSubscribe from './components/SubComponentSubscribe.js';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen 
        name="SubComponent" 
        component={SubComponent} 
        />

        <Stack.Screen 
        name="MyWebView" 
        component={MyWebView} 
        />

        <Stack.Screen 
        name='UserProfileTest' 
        component={UserProfileTest}
        />

        <Stack.Screen 
        name='SubReddits' 
        component={SubReddits}
        />

        <Stack.Screen 
        name='PostComponent' 
        component={PostComponent}
        />

        <Stack.Screen 
        name='Posts' 
        component={Posts}
        />

        <Stack.Screen 
        name='PostsFromSubSearch' 
        component={PostFromSubSearch}
        />

        <Stack.Screen 
        name='SubRedditInfoComponent' 
        component={SubRedditInfoComponent}
        />

        <Stack.Screen 
        name='SubScribeToSub' 
        component={SubScribeToSub}
        />
        <Stack.Screen 
        name='SubComponentSubscribe' 
        component={SubComponentSubscribe}
        />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

