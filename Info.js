import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';

const socialLinks = [
  { id: '1', platform: 'GitHub', url: 'https://github.com/azrilrozaqiarrosyid' },
  { id: '2', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/azrilrozaqiarrosyid/' },
  { id: '3', platform: 'WhatsApp', url: 'wa.me/6281615518479' },
  { id: '4', platform: 'Instagram', url: 'https://instagram.com/iniazrill' },
  { id: '5', platform: 'Email', url: 'mailto:azrilrozaqiarrosyid@mail.ugm.ac.id' },
];

const Info = () => {
  return (
    <ImageBackground source={require('./assets/BG3.jpg')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image 
            source={require('./assets/FOTOAZRIL.jpg')}
            style={styles.profileImage} 
          />
          <Text style={styles.name}>AZRIL ROZAQI AR ROSYID</Text>
          <Text style={styles.name}>22/504560/SV/21660</Text>
          <Text style={styles.description}>Mahasiswa tahun ketiga prodi SIG Sekolah Vokasi Universitas Gadjah Mada</Text>
        </View>

        <FlatList
          style={styles.list}
          data={socialLinks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <View style={styles.socialLink}>
                <Text style={styles.socialText}>{item.platform}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Info;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Resize image to cover the background
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  socialLink: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialText: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
  },
});
