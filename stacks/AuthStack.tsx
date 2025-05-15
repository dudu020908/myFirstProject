import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/Login/LoginScreen";

export type AuthStackScreenList = {
  Login: undefined;
};

//로그인 전 사용할 수 있는 페이지 등록\
const Stack = createStackNavigator<AuthStackScreenList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={"Login"}
        component={LoginScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
