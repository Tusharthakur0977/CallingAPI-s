import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';

interface Post {
  id?: number;
  title?: string;
  body?: string;
  avatar?: any;
}

const App: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const gettApi = async () => {
    setIsLoading(true);
    const url = 'https://jsonplaceholder.typicode.com/posts';
    let response = await fetch(url);
    let posts = await response.json();
    const postsWithAvatar = posts.map((post: Post) => ({
      ...post,
      avatar: require('./assets/images.jpg'),
    }));
    setData(postsWithAvatar);
    setIsLoading(false);
  };

  const renderPosts = useMemo(() => {
    return data.length ? (
      data.map(item => (
        <View
          key={item.id}
          style={{
            backgroundColor: '#fff',
            flex: 1,
            flexDirection: 'row',
            margin: 10,
            padding: 20,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            shadowColor: '#000',
            elevation: 14,
            gap: 20,
          }}>
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
            source={item.avatar}
          />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text
              numberOfLines={1}
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 5,
              }}>
              {item.title}
            </Text>
            <Text
              numberOfLines={4}
              style={{
                color: 'gray',
              }}>
              {item.body}
            </Text>
          </View>
        </View>
      ))
    ) : (
      <Text
        style={{
          textAlign: 'center',
          margin: 20,
          color: 'gray',
        }}>
        No Data Found
      </Text>
    );
  }, [data, isLoading]);

  useEffect(() => {
    gettApi();
    return () => {
setData([])
    }
  }, []);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
      <Text>App</Text>
      {renderPosts}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({});
