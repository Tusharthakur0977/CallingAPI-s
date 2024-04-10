import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

interface Post {
  id?: number;
  title?: string;
  body?: string;
  avatar?: any;
}

const App: React.FC = () => {

  const [data, setData] = useState<Post[]>([{
    avatar: require('./assets/download.jpg')
  }]);

  // const gettApi = async () => {
  //   const url = "https://jsonplaceholder.typicode.com/posts";
  //   let result = await fetch(url);
  //   result = await result.json();
  //   setData(result);
  // };

  const gettApi = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    let response = await fetch(url);
    let posts = await response.json();
    const postsWithAvatar = posts.map(post => ({
      ...post,
      avatar: require('./assets/images.jpg')
    }));
    setData(postsWithAvatar);
  };

  useEffect(() => {
    gettApi();
  }, []);

  return (
    <ScrollView>
      <Text>App</Text>
      {data.length ? data.map((item) =>
        <View key={item.id} style={{
          backgroundColor: '#fff',
          flex: 1,
          flexDirection: 'row',
          margin: 10,
          padding: 20,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          shadowColor: "#000",
          elevation: 14,
          gap: 20
        }}>
          <Image style={{
            height: 100,
            width: 100,
            borderRadius: 50,
          }} source={item.avatar} />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text numberOfLines={1} style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 16,
              marginBottom: 5,
            }}>{item.title}</Text>
            <Text numberOfLines={4} style={{
              color: 'gray',
            }}>{item.body}</Text>
          </View>
        </View>)
        :
        <Text style={{
          textAlign: 'center',
          margin: 20,
          color: 'gray',
        }}>No Data Found</Text>}
    </ScrollView>

  );
};

export default App;

const styles = StyleSheet.create({});
