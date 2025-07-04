import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false, title:''}} />
      <Stack.Screen name='stationpage/[stationId]' options={{ title: 'Reviews on this area', headerTitleAlign: 'center', headerTintColor: '#B9A896',headerStyle: {backgroundColor: '#483C32' }}} />
      <Stack.Screen name='addArea' options={{ title: 'Add an area', headerTitleAlign: 'center', headerTintColor: '#B9A896',headerStyle: {backgroundColor: '#483C32' }}} />
      <Stack.Screen name='reviewpage/[reviewId]' options={{ title: 'Add a review', headerTitleAlign: 'center', headerTintColor: '#B9A896',headerStyle: {backgroundColor: '#483C32' }}} />
    </Stack>
  );
};