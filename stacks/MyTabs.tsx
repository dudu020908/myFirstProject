import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import CreatePost from "../Screens/CreatePost";
import ProFile from "../Screens/ProFile";
import MainStack from "./MainStack";
//하단 Tab을 위한 TabNavigator 컴포넌트 생성
const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="ProFile" component={ProFile} />
    </Tab.Navigator>
  );
};
