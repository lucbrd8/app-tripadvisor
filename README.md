
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

The application is built in three tabs as mentionned in the previous part. The whole application is contained in a (tabs) file to always navigate between the 3 tabs. The home and the about tab contain one screen. The list tab containt 4 screens, which are the list of the rest areas, a screen to add a new area, a screen to see reviews on a precise area, and a screen to add a review to an area. We use the expo-router tool to navigate in the app instead of using Navigation and Stack from react-native, because it was more easy to use and to understand short term. The data storage is made with 3 different databases : one to keep the users information, one which contains the areas, with two fields "name" and "position", and a review database which contains an "areaId" key to link the review to its area, and severals fields to rate the rest area.

## Maps 

At the beginning of the week, we started trying to integrate the expo-maps library, which was recently released in alpha by the Expo team. This library is designed to work on iOS, Android, and Web, which was perfect for our goal of building a cross-platform app. Our objective was to display an interactive map centered on a given location, with a marker and smooth navigation.

I decided to focus only on Apple Maps, which are supported natively on iOS. This would avoid the complexity of Google Maps while still providing a map for iPhone users. I changed the provider to apple, updated the iOS config, and tested with a minimal project. Unfortunately, even this solution didn’t work. Every time I launched the app, I saw an error screen saying “expo maps not recognized,” even though the module was installed and the imports were correct.

After many failed attempts on iOS, I decided to switch to Android. Android is usually more flexible for alpha packages and works better with Expo tools. I installed Android Studio, set up an emulator, and used npx expo run:android to build a Dev Client version of the app. This was necessary because expo-go, the standard client, doesn’t support native libraries like expo-maps.

On Android, I was finally able to run the app without any critical error. When I opened it, a window appeared asking for a Google Maps API key. This was a partial success: it showed that the library was correctly linked to the app, but the API was not configured yet. I still needed to add the API key in the AndroidManifest.xml file and activate the correct services on the Google Cloud Console. Since that required extra time, I put that part on hold.

At the same time, to avoid being stuck, I decided to create a Web version of the map. My goal was to have at least a working demo in the browser. I used react-leaflet, a mature library that easily displays OpenStreetMap maps. I created a MapContainer.web.js component and added a TileLayer and Marker. This allowed me to show a working interactive map on the web, with no complex setup or API key needed. However, I faced an issue with expo-router, which requires that a .web.js file has a fallback file without a platform extension. Because of that, I got an error when loading the page. To fix it, I added an empty MapContainer.js file to serve as a fallback for non-Web platforms. 

Even though I haven’t managed to get everything working yet, I believe this has been a good introduction to the challenges of using experimental packages in a cross-platform project. It gave me hands-on experience with platform-specific configuration, the limitations of Expo Go, and the benefits of using a Dev Client.

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
