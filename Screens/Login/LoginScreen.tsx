import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { auth } from "../../firebaseConfig";
import { FirebaseError } from "firebase/app";

const ImgContainer = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const WelcomeTitle = styled(Text)`
  font-size: 14px;
  color: #0c0c0c;
`;
const AccountBox = styled(View)`
  width: 70%;
  padding: 20px;
  border-radius: 10px;
  gap: 30px;
  background-color: white;
`;
const Logo = styled(Image)`
  width: 100%;
  height: 70px;
`;
const InputField = styled(View)`
  gap: 10px;
`;

const UserInput = styled(TextInput)`
  background-color: #ededed;
  padding: 12px;
  border-radius: 5px;
`;
const UserId = styled(UserInput)``;
const UserPW = styled(UserInput)``;
const LoginBtn = styled(TouchableOpacity)`
  background-color: dodgerblue;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
`;
const LoginBtnTitle = styled(Text)`
  color: white;
`;
const CreateAccountBox = styled(View)`
  align-items: center;
  gap: 10px;
`;
const CreateAccountBtn = styled(TouchableOpacity)``;
const SubTitle = styled(Text)`
  color: #383838;
  font-size: 12px;
`;
export default () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  //Email,PW Input Text 가져와서 State 할당
  const onChangeText = (text: string, type: "email" | "password") => {
    //내가 입력한 타입에 따라 state에 text 할당
    switch (type) {
      case "email":
        setEmail(text);
        break;
      case "password":
        setPassword(text);
        break;
    }
  };
  //로그인 버튼 클릭시 서버와 통신하여 로그인 프로세스
  const onLogin = async () => {
    //로그인 필요 정보 email,password
    setLoading(true);
    //서버 소통 try catch finally, async
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      //유저의 id, password auth 정보를 통해 firebase에 로그인 요청
      console.log("로그인 성공:", result.user);
    } catch (error) {
      //firebase 관련 오류인 경우에만
      if (error instanceof FirebaseError) {
        Alert.alert(error.code);
      }
    } finally {
      //로그인 프로세스 종료시 , 에러여부 관련 없이 로딩 종료
      setLoading(false);
    }
    //error 혹은 로딩
  };
  //회원가입 버튼 클릭시 회원가입 페이지로 이동하는 프로세스
  const goToCreateAccount = () => {};

  return (
    <ImgContainer
      source={require("../../assets/resources/instaDaelim_background.jpg")}
    >
      <AccountBox>
        <Logo
          source={require("../../assets/resources/instaDaelim_title.png")}
        />
        <WelcomeTitle>
          🤗 Welcome! 🤗{"\n"}Here is a My Instagram for Daelim. Glad to meet
          you guys!
        </WelcomeTitle>
        <InputField>
          <UserId
            placeholder="Email *"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              onChangeText(text, "email");
            }}
          />
          <UserPW
            placeholder="Password *"
            keyboardType="default"
            returnKeyType="done"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              onChangeText(text, "password");
            }}
          />
        </InputField>
        <LoginBtn onPress={onLogin}>
          <LoginBtnTitle>Log in</LoginBtnTitle>
        </LoginBtn>
        <CreateAccountBox>
          <SubTitle>Already have an account?</SubTitle>
          <CreateAccountBtn onPress={goToCreateAccount}>
            <SubTitle
              style={{
                color: "#1e90ff",
                fontWeight: "600",
                fontSize: 12.5,
                textDecorationLine: "underline",
              }}
            >
              Create Account
            </SubTitle>
          </CreateAccountBtn>
        </CreateAccountBox>
      </AccountBox>
    </ImgContainer>
  );
};
