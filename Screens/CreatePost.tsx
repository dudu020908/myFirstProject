import { useEffect, useState } from "react";
import { View, Text, Alert, Linking } from "react-native";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";
import * as MediaLibrary from "expo-media-library";
const Container = styled(View)`
  background-color: tomato;
  flex: 0.5;
`;
const PageTitle = styled(Text)`
  font-size: 24px;
`;
//state는 'useState' 라는 Hook을 이용해 만듬
export default () => {
  //Hook 사용법 반드시 use~~로 시작하는 Hook을 만들어야함,사용할땐 항상 최상위 컴포넌트에서 사용되어야함
  //갤러리에서 사진 불러오는 함수
  //A.로딩 여부
  const [loading, setLoding] = useState<boolean>();
  //B.갤러리에서 불러온 사진들
  const [myPhotos, setMyPhotos] = useState<MediaLibrary.Asset[]>([]);
  //C.불러온 사진 중 선택한 사진들
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  //로딩인경우 LoadingScreen, 끝나면 현재 Page
  const getMyPhotos = async () => {
    //1.갤러리 접근 권한 요청
    //비동기란?(권한 요청이 수락되기까지 기다리는동안 불러오기를 하지않고 대기하는것)
    const { status } = await MediaLibrary.requestPermissionsAsync();
    //[방어 코드] : 만일 접근 권한을 거절한 경우
    if (status === MediaLibrary.PermissionStatus.DENIED) {
      Alert.alert(
        "사진 접근 권한",
        "기능을 사용하시려면 사진 접근 권한을 허용해 주세요",
        //Linking.openSettings로 앱의 설정 페이지로 이동시키는 기능
        [
          {
            //-> 접근 권한을 변경할 수 있도록 권한설정창으로 이동
            onPress: async () => {
              await Linking.openSettings();
            },
          },
        ]
      );
      //-> 함수 더이상 실행하지않은채 종료
      return;
    }
    //2.(권한 요청에 수락한 경우)갤러리 사진들 불러오기
    const { assets } = await MediaLibrary.getAssetsAsync();
    //3.불러온 사진들 myPhotos State에 저장/할당하기
    setMyPhotos(assets);
    //final: 로딩 종료
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
