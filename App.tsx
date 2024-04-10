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
    // try {
      let response = await fetch(url);
      let posts = await response.json();
      const postsWithAvatar = posts.map(post => ({
        ...post,
        avatar: require('./assets/images.jpg')
      }));
      setData(postsWithAvatar);
    // } catch (error) {
      // console.error("Failed to fetch posts:", error);
    // }
  };

  useEffect(() => {
    gettApi();
  }, []);

  return (
    <ScrollView>
      <Text>App</Text>
      {data.length ? data.map((item) =>
        <View key={item.id}>
          <Image style={{ height: 100, width: 100, }} source={item.avatar} />
          <Text>{item.title}</Text>
          <Text>{item.body}</Text>

        </View>)
        :
        <Text>No Data Found</Text>}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({});
