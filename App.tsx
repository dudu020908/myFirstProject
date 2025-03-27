import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Home from "./Screens/Home";
import MainStack from "./stacks/MainStack";
import { NavigationContainer } from "@react-navigation/native";
import CreatePost from "./Screens/CreatePost";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./stacks/MyTabs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
