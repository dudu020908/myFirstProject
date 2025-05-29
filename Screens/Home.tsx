import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { MainStackScreenList, NaviProps } from "../stacks/MainStack";
import { auth } from "../firebaseConfig";
export default function Home() {
  //0. Initialized
  // Hook:
  const navi = useNavigation<NaviProps>();
  //A. Logic Process
  const goToPage = () => {
    navi.navigate("CreatePost");
  };
  const signOut = async () => {
    await auth.signOut();
  };
  //B. Page UI Rendering
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>InstaDaelim</Text>
        <Button onPress={goToPage} title={"CREATE"}></Button>
      </View>
      {/* 테스트용 로그아웃버튼 */}
      <Button title="Log Out" onPress={signOut} />
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
