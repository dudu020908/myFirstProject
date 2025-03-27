import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { MainStackScreenList } from "../stacks/MainStack";
export default function Home() {
  //0. Initialized
  // Hook:
  const navi = useNavigation<NativeStackNavigationProp<MainStackScreenList>>();
  //A. Logic Process
  const goToPage = () => {
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
