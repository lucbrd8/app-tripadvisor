import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Home' }} />
      <Stack.Screen name='about' options={{ title: 'About' }} />
      <Stack.Screen name='list' options={{ title: 'List' }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false, title:''}} />
      <Stack.Screen name='(list-subtabs)/addArea' options={{ title: 'Add an area', headerTitleAlign: 'center', headerTintColor: '#B9A896',headerStyle: {backgroundColor: '#483C32' }}} />
    </Stack>
  );
};