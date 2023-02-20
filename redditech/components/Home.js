import { StyleSheet, Text, View, Button } from 'react-native';
function Home({ navigation }) {

  return (
      <View>
        <Button
          title="Connect with Reddit"
          onPress={() =>
            navigation.navigate('MyWebView')
          }
        />
      </View>
  );
};

export default Home;