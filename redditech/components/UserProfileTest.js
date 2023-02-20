import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";


function UserProfileTest() {
    const [user, setUser] = useState(undefined);

    async function getProfile() {
        const token = await AsyncStorage.getItem('access_token');
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Cookie", "csv=2; edgebucket=oV5eJDDssT8uwl3ZHS; loid=0000000000dfs2tff3.2.1626884096000.Z0FBQUFBQmp4b3BYVzlLREhxWkI3TGc5MTdTS0o3X29KTXJlelRMSWZIOUJfTEswMjJ1RW1WUWN5MkVwbGlzRUsybjdtNk5Kc195MnJJYXhqZFBqbmpRdDByMER4TzliaEJjdHRWSExwbU9pV0I0ZFFPWUgwTG9fYzFUV0FuSmU1NG1ZeGxvbGw2aXU; session_tracker=RtRqFYGrQKGQezhl03.0.1673955927792.Z0FBQUFBQmp4b3BYQTQ3QkZ2aEpsWWJLX2x6QjdWb3FFbnhDUzRPdE5PZmZfbGJVUHRKVlFhV3pvNmJ6anF3dGNaV040VWlUTHZKYTVOOWdwbkVFMXZ3Mmp3VG4yQzhXU01ybWJ5bWJuUjI0QVVjLVNJQ1hZMUZQdkFyVzA5eGlacDh3TmQzVFZaU0w");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://oauth.reddit.com/api/v1/me", requestOptions)
            .then(response => response.json())
            .then(async (response) => {
                setUser(response);
                console.log(response);
            })
            .then((response) => console.log(response))
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getProfile();
    }, [])

    return (
        <View style={{borderWidth: 2, padding: 25, marginTop: 40, marginLeft: 8, marginRight: 8}}>
            {user ?
                <View>
                    <View>
                        <Text style={{
                            marginBottom: 20,
                            fontSize: 20,
                            borderWidth: 2,
                            borderRadius: '10%', 'backgroundColor': user.subreddit.icon_color, 
                            textAlign: 'center'
                        }}>{user.subreddit.display_name_prefixed}</Text>
                    </View>
                    <Text style={{marginBottom: 10}}>Title: {user.subreddit.title}</Text>
                    <Image
                        source={{ uri: user.icon_img }}
                        style={styles.stretch}
                    />
                    <Text>Subscribers: {user.subreddit.subscribers}</Text>
                    <Text style={{marginTop: 10}}>Description</Text>
                    {user.subreddit.description ? 
                    <Text>{user.subreddit.description}</Text>
                    :
                    <Text>No description</Text>
                    }
                    <Text style={styles.header_style}>Profile settings</Text>
                    <Text>Reddit employee? {user.is_employee.toString()}</Text>
                    <Text>External account? {user.has_external_account.toString()}</Text>
                    <Text>Coins: {user.subreddit.coins}</Text>
                    <Text>Over 18 content: {user.subreddit.over_18.toString()}</Text>
                    <Text>Quarantined user? {user.subreddit.quarantine.toString()}</Text>
                    <Text>User is moderator: {user.subreddit.user_is_moderator.toString()}</Text>
                    <Text>Account type: {user.subreddit.subreddit_type}</Text>

                </View>
                : <Text>Loading profile...</Text>
            }

        </View>
    )
    
}
export default UserProfileTest;

const styles = StyleSheet.create({
    stretch: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        borderRadius: '50%', 
        marginBottom: 10
    },
    header_style: {
        marginTop: 20,
        fontSize: 25
    }
});