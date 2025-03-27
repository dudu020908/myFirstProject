import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import CreatePost from "./CreatePost";

export default function Home() {
  //0. Initialized
  // Hook:
  const navi = useNavigation();
  //A. Logic Process
  const goToPage = () => {
    Alert.alert("페이지 이동..!");
    navi.navigate("CreatePost");
  };
  //B. Page UI Rendering
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>InstaDaelim</Text>
        <Button onPress={goToPage} title={"CREATE"}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    backgroundColor: "tomato",
    height: 80,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
