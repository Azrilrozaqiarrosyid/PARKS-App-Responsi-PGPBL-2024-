import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App'; // UNTUK IMPORT DARI APP
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faUserGraduate, faUserPen, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { WebView } from 'react-native-webview';
import Createdata from './Createdata';
import Datamahasiswa from './listdata';
import Editdata from './Editdata';
function HomeScreen() { //untuk layout tulisan dan memanggil app
  return (
      <Createdata/>
  );
}

function DatamahasiswaScreen() {
  return (
    <Datamahasiswa/>
  );
}
function EditScreen() {
  return (
    <Editdata/>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tambah" component={HomeScreen} options={{ headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faPlusCircle} size={24} color={color} />
          ),
        }} 
      />
        <Tab.Screen name="Mahasiswa" component={DatamahasiswaScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUserGraduate} size={24} color={color} />
          ),
        }}
      />
        <Tab.Screen name="Edit" component={EditScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUserPen} size={24} color={color} />
          ),
        }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}