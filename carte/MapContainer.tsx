import { View, Text } from 'react-native';

export default function MapContainer() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page disponible uniquement sur le Web</Text>
    </View>
  );
}

///components
//  MapContainer.js         détecte la plateforme et importe dynamiquement
// MapContainerWeb.js       contient le code react-leaflet pour le web


/* ce que j'avais 
{
  "expo": {
    "name": "MonAppLeaflet",
    "slug": "mon-app-leaflet",
    "platforms": ["ios", "android", "web"],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["***"], (mettre un slash dans les crochets après la deuxième étoile)
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
/*