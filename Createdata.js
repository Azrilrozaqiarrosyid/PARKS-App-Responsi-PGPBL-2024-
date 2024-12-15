import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Text, Button, StyleSheet, Image } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const Createdata = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const takePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error(response.errorMessage);
      } else {
        setPhoto(response.assets[0]);
      }
    });
  };

  const handleCoordinatesInput = (field, value) => {
    if (field === 'lat') {
      setLatitude(value);
    } else if (field === 'lon') {
      setLongitude(value);
    }
  };

  const submitReport = () => {
    const reportData = {
      id,
      name,
      contact,
      location,
      coordinates: {
        lat: latitude,
        lon: longitude,
      },
      description,
      photo: photo?.uri,
    };

    fetch('http://10.55.103.108:3000/pelapor', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        alert('Laporan berhasil dikirim!');
        resetForm();
      })
      .catch(error => {
        console.error(error);
        alert('Gagal mengirim laporan!');
      });
  };

  const resetForm = () => {
    setId('');
    setName('');
    setContact('');
    setLocation('');
    setLatitude('');
    setLongitude('');
    setDescription('');
    setPhoto(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
      <Image source={require('./assets/BG3.jpg')} style={styles.backgroundImage} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('./assets/PARKIR.jpg')} style={styles.image} resizeMode="cover" />

        <Text style={styles.title}>Laporan Parkir Liar</Text>

        <Text style={styles.label}>ID Laporan:</Text>
        <TextInput style={styles.input} placeholder="Masukkan ID laporan" value={id} onChangeText={setId} />

        <Text style={styles.label}>Nama Pelapor (Opsional):</Text>
        <TextInput style={styles.input} placeholder="Masukkan nama Anda" value={name} onChangeText={setName} />

        <Text style={styles.label}>Kontak (Opsional):</Text>
        <TextInput style={styles.input} placeholder="Nomor telepon atau email" value={contact} onChangeText={setContact} />

        <Text style={styles.label}>Lokasi (Opsional):</Text>
        <TextInput style={styles.input} placeholder="Nama lokasi atau jalan" value={location} onChangeText={setLocation} />

        <Text style={styles.label}>Koordinat:</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          onChangeText={value => handleCoordinatesInput('lat', value)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          onChangeText={value => handleCoordinatesInput('lon', value)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Deskripsi Kejadian:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Berikan deskripsi kejadian"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        <Button title="Ambil Foto" onPress={takePhoto} style={styles.button} />
        {photo && <Image source={{ uri: photo.uri }} style={styles.photo} />}

        <View style={styles.submitButtonContainer}>
          <Button title="Kirim Laporan" onPress={submitReport} style={styles.button} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc', // Background warna lebih netral
  },
  title: {
    paddingVertical: 18,
    backgroundColor: '#007BFF', // Biru cerah untuk menarik perhatian
    color: 'white',
    fontSize: 26, // Ukuran font lebih besar agar lebih menonjol
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 1,
  },
  label: {
    fontSize: 18,
    marginVertical: 12,
    fontWeight: 'bold',
    color: '#333', // Warna hitam netral
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  textArea: {
    height: 120,
  },
  photo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', // Proporsional tetap
    marginVertical: 12,
    borderRadius: 8,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Mengisi penuh layar
    height: '200%', // Pastikan tinggi background full
    width: '200%', // Pastikan lebar background full
    position: 'absolute',
    zIndex: -1, // Pastikan background di bawah komponen lainnya
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', // Proporsional tetap
  },
  button: {
    backgroundColor: '#007BFF', // Biru terang untuk tombol
    color: 'white',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  submitButtonContainer: {
    marginTop: 16,
  },
});
