import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilePen, faListCheck, faClipboardList, faMapLocationDot, faCircleInfo, faHome } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import Createdata from './Createdata';
import Home from './Home';
import Editdata from './Editdata';
import Info from './Info';

// Screens
function HomeScreen() {
  return <Home />;
}

function DatapelaporScreen() {
  return <Createdata />;
}

function EditScreen() {
  return <Editdata />;
}

function InfoScreen() {
  return <Info />;
}

function MapScreen() {
  return (
    <WebView source={{ uri: 'https://leaflet-map-responsi.vercel.app/home' }} />
  );
}

// Define Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: true, // Enable label
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Peta') {
              return (
                <View style={styles.floatingIconContainer}>
                  <FontAwesomeIcon icon={faMapLocationDot} size={40} color={color} />
                </View>
              );
            } else {
              const icons = {
                Home: faHome,
                Lapor: faListCheck,
                Ubah: faFilePen,
                Kontak: faCircleInfo,
              };
              return <FontAwesomeIcon icon={icons[route.name]} size={24} color={color} />;
            }
          },
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Lapor"
          component={DatapelaporScreen}
          options={{
            tabBarLabel: 'Lapor',
          }}
        />
        <Tab.Screen
          name="Peta"
          component={MapScreen}
          options={{
            tabBarLabel: '', // No label for floating button
          }}
        />
        <Tab.Screen
          name="Ubah"
          component={EditScreen}
          options={{
            tabBarLabel: 'Ubah',
          }}
        />
        <Tab.Screen
          name="Kontak"
          component={InfoScreen}
          options={{
            tabBarLabel: 'Kontak',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Custom Styles
const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 70,
  },
  floatingIconContainer: {
    backgroundColor: '#007BFF',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5, // Adjust position to make it "float" above the tab bar
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
});
