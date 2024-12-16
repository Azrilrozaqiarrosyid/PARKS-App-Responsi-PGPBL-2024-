import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert, Image, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGraduationCap, faChevronRight, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import RNFS from 'react-native-fs';

const Listdata = () => {
    const jsonUrl = 'http://192.168.178.21:3000/pelapor';
    const [isLoading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log('Data dari API:', json);
                setDataUser(json);
            })
            .catch((error) => console.error('Error fetch data:', error))
            .finally(() => setLoading(false));
    }, []);

    function refreshPage() {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log('Data refresh:', json);
                setDataUser(json);
            })
            .catch((error) => console.error('Error refreshing data:', error))
            .finally(() => setLoading(false));
    }

    function deleteData(id) {
        fetch(jsonUrl + '/' + id, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((json) => {
            console.log('Data deleted:', json);
            alert('Data terhapus');
            refreshPage();
        })
        .catch((error) => console.error('Error deleting data:', error));
    }

    const downloadImage = async (url, path) => {
        try {
            const dirs = RNFS.DocumentDirectoryPath; // Direktori tempat file akan disimpan
            const destPath = `${dirs}/${path}`;
            const result = await RNFS.downloadFile({ fromUrl: url, toFile: destPath }).promise;
            return destPath; // Kembalikan path file lokal
        } catch (error) {
            console.error('Error downloading image:', error);
            return null;
        }
    };

    const renderImage = async (photoUrl) => {
        const localPath = await downloadImage(photoUrl, 'photo.jpg');
        if (localPath) {
            return <Image source={{ uri: localPath }} style={styles.photo} />;
        } else {
            return <Text style={styles.cardtitle}>Foto tidak tersedia</Text>;
        }
    };

    const openInGoogleMaps = (latitude, longitude) => {
        if (latitude && longitude && Number.isFinite(latitude) && Number.isFinite(longitude)) {
            const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
            Linking.openURL(url).catch((error) => console.error('Error opening URL:', error));
        } else {
            console.log('Koordinat tidak valid atau tidak tersedia.');
        }
    };

    return (
        <SafeAreaView>
            {isLoading ? (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.cardtitle}>Loading...</Text>
                </View>
            ) : (
                <View>
                    <FlatList
                        style={{ marginBottom: 0 }}
                        data={dataUser}
                        onRefresh={() => refreshPage()}
                        refreshing={refresh}
                        keyExtractor={({ id }, index) => id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity>
                                    <View style={styles.card}>
                                        <View style={styles.avatar}>
                                            <FontAwesomeIcon icon={faGraduationCap} size={50} color={item.color} />
                                        </View>
                                        <View>
                                            <Text style={styles.cardtitle}>ID: {item.id}</Text>
                                            <Text style={styles.cardtitle}>Nama: {item.name}</Text>
                                            <Text style={styles.cardtitle}>Kontak: {item.contact}</Text>
                                            <Text style={styles.cardtitle}>Lokasi: {item.location}</Text>
                                            <Text style={styles.cardtitle}>Deskripsi: {item.description}</Text>
                                            
                                            {/* Validasi dan tampilan koordinat */}
                                            {item.latitude && item.longitude && Number.isFinite(item.latitude) && Number.isFinite(item.longitude) ? (
                                                <>
                                                    <Text style={styles.cardtitle}>Latitude: {item.latitude}</Text>
                                                    <Text style={styles.cardtitle}>Longitude: {item.longitude}</Text>
                                                    <TouchableOpacity
                                                        style={styles.mapButton}
                                                        onPress={() => openInGoogleMaps(item.latitude, item.longitude)}
                                                    >
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} size={16} />
                                                        <Text style={styles.cardtitle}>Lihat di Google Maps</Text>
                                                    </TouchableOpacity>
                                                </>
                                            ) : (
                                                <Text style={styles.cardtitle}>Koordinat tidak tersedia</Text>
                                            )}
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <FontAwesomeIcon icon={faChevronRight} size={20} />
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.form}>
                                    {item.photo ? (
                                        <Image source={{ uri: item.photo }} style={styles.photo} />
                                    ) : (
                                        <Text style={styles.cardtitle}>Foto tidak tersedia</Text>
                                    )}
                                </View>

                                <Button
                                    title="Hapus"
                                    onPress={() =>
                                        Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                                            { text: 'Tidak', onPress: () => console.log('button tidak') },
                                            { text: 'Ya', onPress: () => deleteData(item.id) },
                                        ])
                                    }
                                    color={'red'}
                                />
                            </View>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default Listdata;

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#333',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatar: {
        borderRadius: 100,
        width: 80,
    },
    cardtitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7,
    },
    form: {
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 20,
    },
    photo: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 10,
    },
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white',
    },
});
