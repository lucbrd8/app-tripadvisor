import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#B9A896',
            headerStyle: {
                backgroundColor: '#483C32',
            },
            headerShadowVisible: false,
            headerTintColor: '#B9A896',
            tabBarStyle: {
                backgroundColor: '#483C32',
            },
        }}
    >
      <Tabs.Screen 
        name="list" 
        options={{ 
            title: 'List',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={'reorder-three'} color={color} size={24} />
            ),
        }}
      />
      <Tabs.Screen 
        name="index" 
        options={{ 
            title: 'Home',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={'home'} color={color} size={24} />
            ),
        }}
      />
      <Tabs.Screen 
        name="about" 
        options={{ 
            title: 'Profile',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={'person'} color={color} size={24}/>
            ),
        }} 
      />
    </Tabs>
  );
}
