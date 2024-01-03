import { View, CustomText } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OpeningScreen from "./screens/OpeningScreen";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import CategorySelectScreen from "./screens/CategorySelectScreen";
import Homepage from "./screens/Homepage";

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OpeningScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="OpeningScreen" component={OpeningScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="CategorySelect" component={CategorySelectScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
