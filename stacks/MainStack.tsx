import { createStackNavigator, Header } from "@react-navigation/stack";
import CreatePost from "../Screens/CreatePost";
import Home from "../Screens/Home";
import MyTabs from "./MyTabs";
//Stack을 사용하기위한 Navigation 컴포넌트
const Stack = createStackNavigator();
export default () => {
  //1. Stack.Navigator로 관리하길 원하는 Screen 감싸기
  return (
    <Stack.Navigator>
      {/* 1번째 화면 홈*/}
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      {/* 2번째 화면 피드/포스트 만들기*/}
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};
