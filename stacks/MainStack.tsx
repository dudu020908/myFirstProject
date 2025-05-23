import { createStackNavigator } from "@react-navigation/stack";
import CreatePost, { DummyDataType } from "../Screens/CreatePost";
import MyTabs from "./MyTabs";
import UploadPost from "../Screens/UploadPost";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// MainStack 에 등록된 Screen 리스트(type)
export type MainStackScreenList = {
  /*Screen 이름 : 전달하려는 data */
  MyTabs: undefined;
  CreatePost: undefined;
  UploadPost: {
    assets: DummyDataType[];
  };
};
export type NaviProps = NativeStackNavigationProp<MainStackScreenList>;
//Stack을 사용하기위한 Navigation 컴포넌트
const Stack = createStackNavigator<MainStackScreenList>();
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
      {/* 3번째 화면 업로드 포스트 만들기*/}
      <Stack.Screen name="UploadPost" component={UploadPost} />
    </Stack.Navigator>
  );
};
