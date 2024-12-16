import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ImagePicker from 'react-native-image-picker';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://192.168.178.21:3000/pelapor';
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const refreshPage = () => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Data berhasil dihapus!');
          refreshPage();
        } else {
          alert('Gagal menghapus data. Coba lagi!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menghapus data.');
      });
  };

  const selectItem = (item) => {
    setSelectedUser(item);
    setId(item.id);
    setName(item.name);
    setContact(item.contact);
    setLocation(item.location);
    setLatitude(item.latitude);
    setLongitude(item.longitude);
    setDescription(item.description);
    setPhoto(item.photo);
  };

  const submit = () => {
    const data = {
      id,
      name,
      contact,
      location,
      latitude,
      longitude,
      description,
      photo,
    };

    fetch(`${jsonUrl}/${selectedUser.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data berhasil diperbarui!');
        setId('');
        setName('');
        setContact('');
        setLocation('');
        setLatitude('');
        setLongitude('');
        setDescription('');
        setPhoto(null);
        refreshPage();
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('./assets/BG3.jpg')} style={styles.backgroundImage} />

      <Text style={styles.title}>Lihat dan Perbarui Laporan Anda!</Text>

      <ScrollView style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="ID"
          value={id}
          onChangeText={(value) => setId(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Kontak"
          value={contact}
          onChangeText={(value) => setContact(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Lokasi"
          value={location}
          onChangeText={(value) => setLocation(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          onChangeText={(value) => setLatitude(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          onChangeText={(value) => setLongitude(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Deskripsi"
          value={description}
          onChangeText={(value) => setDescription(value)}
        />

        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          <Text style={styles.photoButtonText}>Pilih Foto</Text>
        </TouchableOpacity>

        {photo && (
          <View style={styles.previewImageContainer}>
            <Text style={styles.previewText}>Foto Terpilih:</Text>
            <Image
              source={{ uri: photo }}
              style={styles.previewImage}
            />
          </View>
        )}
      </ScrollView>

      <FlatList
        style={styles.list}
        data={dataUser}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refresh}
        onRefresh={refreshPage}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectItem(item)}>
            <View style={styles.card}>
              <FontAwesomeIcon icon={faTriangleExclamation} size={24} color="red" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.id}</Text>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>{item.contact}</Text>
                <Text>{item.location}</Text>
                <Text>
                  {item.latitude}, {item.longitude}
                </Text>
                <Text>{item.description}</Text>
                <Button
                  title="Hapus"
                  color="red"
                  onPress={() =>
                    Alert.alert('Hapus Data', `Yakin ingin menghapus ${item.name}?`, [
                      { text: 'Tidak', style: 'cancel' },
                      { text: 'Ya', onPress: () => deleteData(item.id) },
                    ])
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.submitButtonContainer}>
        <Button title="Simpan Data" onPress={submit} />
      </View>
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    position: 'absolute',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  photoButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  photoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  previewImageContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  previewText: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  list: {
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  submitButtonContainer: {
    margin: 20,
  },
});
