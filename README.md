
   b) la description de vos choix techniques
   c) les outils et les librairies, avec leur version, que nous devons utiliser pour exécuter vos projets
   d) le numéro (hash) du commit contenant la version stable de votre projet
   
# Welcome to our Truckadvisor application 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

Our project is to create a mobile app for truck drivers and delivery people, like Tripadvisor.
Users will be able to log in and create an account (page **Profile**).
They will see a list of different highway rest areas, with useful information (overall rating, location, showers, staff, etc.) (page **List**).
Each new user can write a review about a rest area or add a new one to the list.
The **Home** page also shows a map so users can find rest areas more easily.
The name of our app is TruckAdvisor.

## Technical choices

We chose React Native and Expo Router to build our app because they make development faster and easier. With React Native, we can create one app that works on both iOS and Android, using the same code. Expo gives us helpful tools to test the app quickly and send updates without going through the app stores. Expo Router helps us organize our screens better with simple navigation. These tools let us save time and build a good app more efficiently. 
We use Firebase for data storage because it allows us to easily handle the app's backend without having to go too deep into the code.

## Dependencies that we used

expo-router
expo-location
react-native
react
firebase
expo-image
expo-splash-screen
expo-icons

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

We have mainly used the Expo Go app to see the result of our project.

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

The file assets contains all the images (map) and icons (logo) we need to do the front of the app. 

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
