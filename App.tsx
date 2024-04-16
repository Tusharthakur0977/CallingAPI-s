import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Modal from 'react-native-modal';

interface Post {
  id?: number;
  name?: string;
  age?: string;
  email?: any;
  avatar?: any;
}

const App: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Post | undefined>(undefined);
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [age, setAge] = useState(undefined);

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setAge(selectedUser.age);
    }
  }, [selectedUser]);

  const updateUser = async () => {
    // console.warn(name, email, age);
    const url = 'http://192.168.1.3:3000/user';
    const id = selectedUser?.id;
    let response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, age}),
    });
    response = await response.json();
    if (response) {
      console.warn(response);
      gettApi();
      setModalVisible(false);
    }
  };

  const gettApi = async () => {
    setIsLoading(true);
    const url = 'http://192.168.1.3:3000/user';
    let response = await fetch(url);
    let posts = await response.json();
    const postsWithAvatar = posts.map((post: Post) => ({
      ...post,
      avatar: require('./assets/images.jpg'),
    }));
    setData(postsWithAvatar);
    setIsLoading(false);
  };

  const deleteApi = async (id: string) => {
    const url = 'http://192.168.1.3:3000/user';
    let response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    response = await response.json();
    if (response) {
      console.warn('Data Deleted Successfully');
      gettApi();
    }
  };

  const UserModal = data => {
    setModalVisible(true);
    setSelectedUser(data);
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
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text
              numberOfLines={1}
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 5,
              }}>
              {item.name}
            </Text>
            <Text
              numberOfLines={4}
              style={{
                color: 'gray',
              }}>
              {item.age}
            </Text>
            <Text
              numberOfLines={4}
              style={{
                color: 'gray',
              }}>
              {item.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 4,
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                borderRadius: 10,
              }}
              onPress={() => deleteApi(item.id)}>
              <Text style={{padding: 5, color: 'red'}}>Delete</Text>
            </Pressable>
            <TouchableOpacity
              style={{borderRadius: 10}}
              onPress={() => UserModal(item)}>
              <Text style={{padding: 5, color: 'green'}}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
        <Text
          style={{
            marginHorizontal: 20,
            marginTop: '70%',
            color: 'red',
            fontSize: 30,
          }}>
          No Data Found
        </Text>
        <ActivityIndicator size={30} color={'red'} />
      </View>
    );
  }, [data, isLoading]);

  useEffect(() => {
    gettApi();
    return () => {
      setData([]);
    };
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={50} />
      </View>
    );
  }

  return (
    <ScrollView>
      <Text>App</Text>
      {renderPosts}
      <Modal isVisible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedUser && (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'black'}}>Name :</Text>
                  <TextInput
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={{
                      borderWidth: 1,
                      width: '90%',
                      height: 45,
                    }}
                  />
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Text>Age :</Text>
                  <TextInput
                    placeholder="Enter Age"
                    value={age}
                    onChangeText={text => setAge(text)}
                    style={{borderWidth: 1, width: '90%', height: 45}}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>Email :</Text>
                  <TextInput
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={{borderWidth: 1, width: '90%', height: 45}}
                  />
                </View>
              </>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <Pressable
                onPress={updateUser}
                style={{
                  borderWidth: 2,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 2,
                  backgroundColor: '#1A73E9',
                }}>
                <Text style={{color: '#fff', fontSize: 17}}>Update</Text>
              </Pressable>
              <Pressable
                style={{
                  borderWidth: 2,
                  paddingHorizontal: 25,
                  paddingVertical: 5,
                  backgroundColor: '#AB2C2C',
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={{color: '#fff', fontSize: 17}}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '50%',
    width: '80%',
    gap: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
