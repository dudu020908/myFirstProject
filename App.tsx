import MainStack from "./stacks/MainStack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./stacks/AuthStack";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { User } from "firebase/auth";
import LoadingScreen from "./Screens/LoadingScreen";

export default function App() {
  const Stack = createStackNavigator();
  // 유저 정보 저장할 State
  const [User, setUser] = useState<User | null>(null);
  //로딩(로그인 여부 파악까지 걸리는 시간)
  const [Loading, setLoading] = useState(true);
  //서버와 소통하여 로그인 여부 파악
  const getAuth = async () => {
    try {
      //1. Server와 소통하여 로그인 여부 확인할때까지 기다림
      await auth.authStateReady();

      // --로그인 여부 파악이 끝났다면, 로딩 종료
      setLoading(false);

      //2. 로그인 여부에 따른 User의 현재 접속상태 확인
      auth.onAuthStateChanged((authState) => {
        //3. 상태 변화에 따라 로그인 여부 판단
        //3-a. 로그인 성공 user에 값 할당
        if (authState) {
          setUser(authState);
        }
        //3-b. 로그인 실패 user에 값 reset
        else {
          setUser(null);
        }
      });
    } catch (e) {
      console.warn(e);
    }
  };
  //App.tsx 즉 앱 실행시, 최초 1번 실행
  useEffect(() => {
    getAuth();
  }, []);
  const MainStream = User ? <MainStack /> : <AuthStack />;
  return (
    <NavigationContainer>
      {/* 로그인 여부에 따라 다른 스택을 등록 */}
      {/* 로그인 o : main 로그인 x : auth */}
      {Loading ? <LoadingScreen /> : MainStream}
    </NavigationContainer>
  );
}
