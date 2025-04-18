import { View, Text, Image } from "react-native";
import styled from "styled-components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackScreenList } from "../stacks/MainStack";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const Container = styled(View)``;
const Title = styled(Text)``;

const UploadBox = styled(View)`
  flex-direction: row;
  background-color: tomato;
`;
const Caption = styled(View)`
  background-color: blue;
  flex: 1;
`;
const Input = styled(TextInput)`
  color: wheat;
`;

const PhotoBox = styled(View)`
  width: 150px;
  height: 150px;
`;
const Photo = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
const PhotoBlack = styled(View)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: black;
  opacity: 0.3;
  position: absolute;
`;

// 네비게이션은 네비게이션 화면이동 스택스크린 프롭스는 받아온값 화면에띄울때

//route.params -> useNavigation 에서 전달받은 데이터가 들어있음
export default ({
  route: { params },
}: NativeStackScreenProps<MainStackScreenList, "UploadPost">) => {
  //어떤 이유로 params.assets 값이 null 일경우 [] 빈 배열을 할당한다는 삼항 연산자.
  const assets = params.assets ?? [];

  return (
    <Container>
      <Title>Upload Post Page</Title>
      <UploadBox>
        <PhotoBox>
          <Photo source={{ uri: assets[0].uri }} />
          <PhotoBlack />
          <AntDesign
            style={{ position: "absolute", right: 0, margin: 6 }}
            name="switcher"
            size={25}
            color={"white"}
          />
        </PhotoBox>
        {/*글 작성 하는 영역 */}
        <Caption>
          <Input />
        </Caption>
      </UploadBox>
    </Container>
  );
};
