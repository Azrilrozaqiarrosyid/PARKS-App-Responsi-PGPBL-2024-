import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App'; // UNTUK IMPORT DARI APP
import Mahasiswa from './Mahasiswa'; //import komponen mahasiswa dari file mahasiswa
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faUserGraduate } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { WebView } from 'react-native-webview';
 
function HomeScreen() { //untuk layout tulisan dan memanggil app
  return (
      <Profil/>
  );
}

function DatamahasiswaScreen() {
  return (
    <Mahasiswa/>
  );
}
function WebScreen() {
  return (
    <WebView
      source={{ uri: 'https://github.com/azrilrozaqiarrosyid' }}
    />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profil" component={HomeScreen} options={{ headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} size={24} color={color} />
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
        <Tab.Screen name="GitHub" component={WebScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faGithub} size={24} color={color} />
          ),
        }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}