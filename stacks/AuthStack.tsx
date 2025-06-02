import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/Login/LoginScreen";
import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps,
} from "@react-navigation/native-stack";
import SignUpScreen from "../Screens/Login/SignUpScreen";
//로그인 관련 프로세스
export type AuthStackScreenList = {
  Login: undefined;
  Signup: undefined;
};

//로그인 전 사용할 수 있는 페이지 등록\
const Stack = createStackNavigator<AuthStackScreenList>();
// page 이동 시 필요한 Navigation props 타입 생성
export type AuthNaviProps = NativeStackNavigationProp<AuthStackScreenList>;
export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={"Login"}
        component={LoginScreen}

        // options={{ headerShown: false }}
      />
      <Stack.Screen name={"Signup"} component={SignUpScreen} />
    </Stack.Navigator>
  );
};
