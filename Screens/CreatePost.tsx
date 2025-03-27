import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";
const Container = styled(View)`
  background-color: tomato;
  flex: 0.5;
`;
const PageTitle = styled(Text)`
  font-size: 24px;
`;
//state는 'useState' 라는 Hook을 이용해 만듬
export default () => {
  //갤러리에서 사진 불러오는 함수

  //로딩인경우 LoadingScreen, 끝나면 현재 Page
  const [loading, setLoding] = useState(true);
  const getMyPhotos = () => {
    Alert.alert("사진을 불러오는중!");
    //내 갤러리에서 사진 불러오기
    setLoding(false);
  };
  //현재 페이지 접속 시, 1번 실행되는 Hook
  useEffect(() => {
    //3초후에 사진불러오기 실행
    setTimeout(() => {
      getMyPhotos();
    }, 3000);
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <PageTitle>why</PageTitle>
    </Container>
  );
};
