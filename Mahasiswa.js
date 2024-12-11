import React from 'react'
import DataMahasiswa from './data/mahasiswa.json.json'
import { FlatList, Text, View, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGraduate, faMars, faVenus } from '@fortawesome/free-regular-svg-icons';

const Mahasiswa = () => {
 return (
<FlatList //untuk looping data dan dirandom jadi item-item, ada view masing-masing card
    data={DataMahasiswa}
    onRefresh={() => { refreshPage() }}
       renderItem={({ item }) => (
        <TouchableOpacity onPress={() => // saat diklik, akan mengarah ke url tertentu. onpress akan membuat url ke google navigation
             Linking.openURL('google.navigation:q=' + item.latitude + ',' + item.longitude)} >
          <View style={styles.card}> 
            <View style={styles.avatar}>
              <FontAwesomeIcon icon={faUserGraduate} size={50} 
              color={item.gender == 'male' ? 'lightblue' : 'yellow'} />
            </View>
            <View>
              <Text style={styles.cardtitle}>{item.first_name} {item.last_name}</Text>
              <Text>{item.gender}</Text>

              <FontAwesomeIcon
              icon={item.gender == 'male' ? faMars : faVenus} 
              size={20} 
              color={item.gender == 'male' ? 'lightblue' : 'pink'}
              />

              <Text>Kelas {item.class}</Text>
              <Text>{item.latitude}, {item.longitude}</Text>
            </View>
          </View>
        </TouchableOpacity>
       )}
      />
       
 )
}

export default Mahasiswa

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
      width: 70,
    },
    cardtitle: {
      fontSize: 17,
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
      marginVertical: 7
    },
   })
   