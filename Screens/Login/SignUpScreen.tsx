import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
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
import { useNavigation } from "@react-navigation/native";
import { AuthNaviProps } from "../../stacks/AuthStack";

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
const UserName = styled(UserInput)``;
const UserId = styled(UserInput)``;
const UserPW = styled(UserInput)``;
const SignupBtn = styled(TouchableOpacity)`
  background-color: dodgerblue;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
`;
const SignupBtnTitle = styled(Text)`
  color: white;
`;
const Footer = styled(View)`
  align-items: center;
  gap: 5px;
`;
const SubTitle = styled(Text)`
  text-align: center;
  color: #383838;
  font-size: 12px;
`;
export default () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navi = useNavigation();
  //Email,PW Input Text 가져와서 State 할당
  const onChangeText = (text: string, type: "email" | "password" | "name") => {
    //내가 입력한 타입에 따라 state에 text 할당
    switch (type) {
      case "email":
        setEmail(text);
        break;
      case "password":
        setPassword(text);
        break;
      case "name":
        setName(text);
        break;
    }
  };
  //로그인 버튼 클릭시 서버와 통신하여 로그인 프로세스
  const onSubmit = async () => {
    //로그인 필요 정보 email,password
    setLoading(true);
    //서버 소통 try catch finally, async
    try {
      //유저의 id, password auth 정보를 통해 firebase에 회원가입 요청
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //회원 가입 완료시, 해당계정 닉네임 갱신
      await updateProfile(result.user, {
        displayName: name,
      });
      if (result) {
        Alert.alert("회원가입 성공:");
      }
    } catch (error) {
      //firebase 관련 오류인 경우에만
      if (error instanceof FirebaseError) {
        //Code 형변환
        const code = error.code as keyof ErrorCodeType;
        //해당 키 값의 Value 값을 가져옴
        const message = ErrorCode[code] as keyof ErrorCodeType;
        //해당 Value 값을 알림창에 띄움
        Alert.alert("경고", message);
      }
    } finally {
      //로그인 프로세스 종료시 , 에러여부 관련 없이 로딩 종료
      setLoading(false);
    }
    //error 혹은 로딩
  };
  //회원가입 버튼 클릭시 회원가입 페이지로 이동하는 프로세스
  const goBack = () => {
    navi.goBack();
  };

  return (
    <ImgContainer
      source={require("../../assets/resources/instaDaelim_background.jpg")}
    >
      <AccountBox>
        <Logo
          source={require("../../assets/resources/instaDaelim_title.png")}
        />
        <WelcomeTitle>
          🤗 환영합니다! 🤗{"\n"} 이곳은 회원가입 페이지 입니다. 당신의 닉네임,
          이메일 등을 작성하여 회원가입을 완료하세요!
        </WelcomeTitle>
        <InputField>
          <UserName
            placeholder="Nickname *"
            keyboardType="default"
            value={name}
            onChangeText={(text) => {
              onChangeText(text, "name");
            }}
          />
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
        <View style={{ gap: 5 }}>
          <SignupBtn onPress={loading ? undefined : onSubmit}>
            <SignupBtnTitle>
              {loading ? "Loading..." : "Create Account"}
            </SignupBtnTitle>
          </SignupBtn>
          <SignupBtn onPress={goBack} style={{ backgroundColor: "#256ba5" }}>
            <SignupBtnTitle>go Back</SignupBtnTitle>
          </SignupBtn>
        </View>
        <Footer>
          <SubTitle>CopyRight 2025{"\n"}LeeDoWon all rights reserved</SubTitle>
        </Footer>
      </AccountBox>
    </ImgContainer>
  );
};
// ---- firebase 로그인 Errorcode ----
// auth/invalid-credential 유효하지않은 이메일/암호
// auth/invalid-email 유효하지않은 이메일 형식
// auth/missing-password 비밀번호에 입력이없는경우
type ErrorCodeType = {
  "auth/invalid-credential": String;
  "auth/invalid-email": String;
  "auth/missing-password": String;
};
const ErrorCode: ErrorCodeType = {
  "auth/invalid-credential": "유효하지않은 이메일 혹은 암호입니다.",
  "auth/invalid-email": "유효하지않은 이메일 형식입니다.",
  "auth/missing-password": "비밀번호를 입력해주세요.",
};
