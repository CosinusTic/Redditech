import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, Image, ScrollView, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';


const Item = ({title, author, comments, description, thumbnail, upvotes, postHint}) => (
    <View style={styles.postView}>
      <View style={styles.title_bg}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text>Author: {author}</Text>
      
      <Text>Description: {description}</Text>
      
      {
        postHint == "image" || postHint == "gif" ? 
        <Image
        source={{ uri: thumbnail }}
        style={styles.stretch}
        /> : 
        <View>
          <Image
            source={{ uri: 'https://download.logo.wine/logo/Reddit/Reddit-Logo.wine.png' }}
            style={styles.small_img}
          />
          <Text>No picture or explicit content</Text>
          
        </View>
      }
      <Text>Upvotes: {upvotes}</Text>
          <Text>Comments: {comments}</Text>
      
    </View>
  );
   
  function PostComponent( {data}) {
    const [distanceFromEnd, setDistanceFromEnd] = useState(0.7);
    return (
      <>
        {data ?
          <View>
            <FlatList
              data={data}
              renderItem={({ item }) => 
              <Item 
                title={item.subreddit_name_prefixed} 
                url={item.banner_background_image} 
                author={item.author}
                comments={item.num_comments}
                description={item.title}
                thumbnail={item.thumbnail}
                upvotes={item.score}
                postHint={item.post_hint}
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
      margin: 20
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20,
      backgroundColor: '#c7c7c7', 
    },
    title_bg: {
      borderRadius: '5%',
      marginBottom: 6
    },
    stretch: {
      width: 150,
      height: 120,
      resizeMode: 'stretch',
      margin: 5, 
      alignContent: 'center', 
      alignSelf: 'center'
    },
    small_img:{
      width: 100, 
      height: 80, 
      resizeMode: 'stretch'
    }, 
    postView: {
      borderColor: 'black', 
      borderWidth: 2,
      borderRadius: '20%', 
      backgroundColor: '#fbcbcb', 
      margin: 10, 
      padding: 5
    }
  });
export default PostComponent;