# Expo Project 만들기

npx create expo-app "projectnaem" --template
Blank(TS)선택

# styled-component 설치하기 & extension

# React-Navi

# npm install @expo/vector-icons --force

## Expo Server 시작하기

## firebase 설치하기

1. firebase 콘솔에서 프로젝스 생성
2. 웹/앱으로 생성
3. firebase sdk 추가 : npm install firebase --force
4. firebase sdk config copy , firebase config.ts 만들어 paste
   npx expo start

## firebase RN용으로 변경하기 위한 AsyncStorage 설치

1. npm i @react-native-async-storage/async-storage --force
2. firebaseConfig에 1번으로 설치된 설정값 추가/수정
3. tsconfig.ts에 paths:'["@firebase/auth":...]'추가

   - 2번을 하기위한 올바른 사용 경로를 인식 가능하게 ts 알려주기위함.

4. 로그인/회원가입 입력 처리 템플릿
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   return (
   <Container>
   <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
   <TextInput value={password} onChangeText={setPassword} secureTextEntry />
   <Button title="로그인" onPress={handleLogin} />
   </Container>
   );

5. Firebase 초기화 및 로그인 처리
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";

const firebaseConfig = { /_ config _/ };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 3. 화면 이동(Navigation) 구조
<Stack.Navigator>
<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="SignUp" component={SignUpScreen} />
</Stack.Navigator>

4. 공통 버튼 컴포넌트 템플릿
   <TouchableOpacity onPress={onPress}>
   <Icon name={iconName} size={24} />
   </TouchableOpacity>

5. 유틸 함수 템플릿
   export const assetToBlob = async (uri: string): Promise<Blob> => {
   const response = await fetch(uri);
   return await response.blob();
   };
   비동기 처리 패턴, 유틸리티 함수 작성 이해

TextInput + useState + 출력
import { useState } from "react";
import { TextInput, View, Text } from "react-native";
import styled from "styled-components";

const Container = styled(View)`  flex: 1;
  justify-content: center;
  align-items: center;`;
const Input = styled(TextInput)`  border: 1px solid #ccc;
  padding: 10px;
  width: 80%;
  margin-bottom: 20px;`;
const Output = styled(Text)`  font-size: 25px;
  color: #1566f1;`;

export default () => {
const [name, setName] = useState("");
return (
<Container>
<Input placeholder="이름을 입력하세요" onChangeText={setName} />
<Output>{name}</Output>
</Container>
);
};
조건부 렌더링
버튼 2개: "보이기", "숨기기"

상태 변수 visible을 만들어서, Text를 보였다가 숨기는 기능 구현

import { useState } from "react";
import { View, Button, Text } from "react-native";
import styled from "styled-components";

const Container = styled(View)`  flex: 1;
  justify-content: center;
  align-items: center;`;
const Message = styled(Text)`  font-size: 20px;
  margin: 20px;`;

export default () => {
const [visible, setVisible] = useState(true);
return (
<Container>
{visible && <Message>Hello World</Message>}
<Button title="보이기" onPress={() => setVisible(true)} />
<Button title="숨기기" onPress={() => setVisible(false)} />
</Container>
);
};

Stack Navigation 이동 버튼
첫 화면: HomeScreen.tsx, 버튼 클릭 시 NextScreen.tsx로 이동
NextScreen에는 "다음 화면입니다." 텍스트 출력

HomeScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { View, Button } from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`  flex: 1;
  justify-content: center;
  align-items: center;`;

export default function HomeScreen() {
const nav = useNavigation();
return (
<Container>
<Button title="다음으로" onPress={() => nav.navigate('Next')} />
</Container>
);
}
NextScreen.tsx
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`  flex: 1;
  justify-content: center;
  align-items: center;`;

export default () => (
<Container>
<Text>다음 화면입니다.</Text>
</Container>
);
App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import NextScreen from './NextScreen';

const Stack = createNativeStackNavigator();

export default function App() {
return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Next" component={NextScreen} />
</Stack.Navigator>
</NavigationContainer>
);
}

Text 색상 상태 토글
버튼을 클릭할 때마다 Text의 색상이 빨강 <-> 파랑으로 토글되도록 만드세요.

상태값은 useState로 처리
import { useState } from "react";
import { View, Button, Text } from "react-native";
import styled from "styled-components";

const Container = styled(View)`  flex: 1;
  justify-content: center;
  align-items: center;`;
const ColorText = styled(Text)<{ red: boolean }>`  color: ${(props) => (props.red ? "red" : "#1566f1")};
  font-size: 30px;`;

export default () => {
const [isRed, setIsRed] = useState(true);
return (
<Container>
<ColorText red={isRed}>색상이 바뀌어요</ColorText>
<Button title="색상 바꾸기" onPress={() => setIsRed(!isRed)} />
</Container>
);
};

하단 탭(Tab Navigation) 구성  
탭 네비게이션으로 두 화면 구성

첫 번째: HomeScreen → "홈입니다" 출력

두 번째: ProfileScreen → "프로필입니다" 출력

App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
return (
<NavigationContainer>
<Tab.Navigator>
<Tab.Screen name="Home" component={HomeScreen} />
<Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
</NavigationContainer>
);
}

HomeScreen.tsx
import { View, Text } from "react-native";

export default () => (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
<Text>홈입니다</Text>
</View>
);

ProfileScreen.tsx
import { View, Text } from "react-native";

export default () => (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
<Text>프로필입니다</Text>
</View>
);
