import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, StyleSheet, Image, ImageBackground, FlatList, TouchableOpacity, Linking } from 'react-native';

const newsData = [
  {
    id: '1',
    title: 'Berita polemik parkir di Kota Yogyakarta',
    link: 'https://www.kompas.com/tag/parkir-yogyakarta',
    image: require('./assets/BERITA1.jpg'),
  },
  {
    id: '2',
    title: 'Peraturan Biaya Parkir di Kota Yogyakarta',
    link: 'https://perhubungan.jogjakota.go.id/detail/index/30914',
    image: require('./assets/BERITA2.jpg'),
  },
  {
    id: '3',
    title: 'Tempat parkir yang direkomendasikan di sekitar Malioboro',
    link: 'https://www.kompas.com/tag/parkir-malioboro',
    image: require('./assets/BERITA3.jpg'),
  },
  {
    id: '4',
    title: 'Parkir sembarangan, siap-siap denda 50 juta.',
    link: 'https://warta.jogjakota.go.id/detail/index/32921#:~:text=Sesuai%20aturan%20itu%20para%20pelanggar,parkir%20di%20tempat%20tidak%20semestinya.',
    image: require('./assets/BERITA4.jpeg'),
  },
];

const MainPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('./assets/BG3.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.titleContainer}>
            <Image source={require('./assets/ICONPARKIR.jpg')} style={styles.logo} />
            <Text style={styles.title}>PARKS</Text>
            <Text style={styles.subtitle}>(Parking Accountability and Reporting System)</Text>
          </View>

          {/* Content Section */}
          <View style={styles.content}>
            <View style={styles.infoContainer}>
              <Text style={styles.description}>
                Selamat datang di aplikasi PARKS! Aplikasi ini membantu Anda dalam
                pengelolaan data spasial dan pelaporan, termasuk fitur pelaporan
                parkir liar dengan foto dan geolokasi.
              </Text>
            </View>

            {/* Berita Terkini dengan Carousel */}
            <View style={styles.newsContainer}>
              <Text style={styles.newsTitle}>Berita Terkini</Text>
              <FlatList
                data={newsData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.newsCard}>
                    <Image source={item.image} style={styles.newsImage} />
                    <Text style={styles.newsText}>{item.title}</Text>
                    <TouchableOpacity
                      style={styles.linkButton}
                      onPress={() => Linking.openURL(item.link)}
                    >
                      <Text style={styles.linkButtonText}>Baca Berita</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>

            {/* Button Section */}
            <View style={styles.buttonContainer}>
              <Button
                title="Pergi ke Halaman Resmi DISHUB Kota Yogyakarta"
                onPress={() => Linking.openURL('https://perhubungan.jogjakota.go.id/')}
              />
              <View style={styles.buttonSpacing} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 5,
  },
  infoContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  newsContainer: {
    padding: 20,
    backgroundColor: 'rgba(217, 237, 247, 0.9)',
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#31708f',
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    width: 250,
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  newsText: {
    fontSize: 14,
    marginTop: 10,
    color: '#31708f',
  },
  linkButton: {
    marginTop: 10,
    backgroundColor: '#31708f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  buttonSpacing: {
    height: 10,
  },
});
