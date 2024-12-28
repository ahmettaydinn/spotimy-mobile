import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SongsProvider } from "./components/context/SongsProvider"
import { AudioProvider } from "./components/context/AudioContext"
import Login from "./components/Login"
import Songs from "./screens/Songs"
import SongPlay from "./screens/SongPlay"
import Home from "./screens/Home"
import Details from "./screens/Details"
import AudioFooter from "./components/AudioFooter"
import Footer from "./components/Footer"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AudioProvider>
      <SongsProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
                     headerShown: false
                  }} initialRouteName="Login">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Songs" component={Songs} />
            <Stack.Screen name="SongPlay" component={SongPlay} />
            <Stack.Screen name="Details" component={Details} />
          </Stack.Navigator>
        {/* <AudioFooter /> */}
        {/* <Footer /> */}
         </NavigationContainer>
      </SongsProvider>
    </AudioProvider>
  )
}
