import { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  Linking,
  FlatList,
  Image,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";
import * as MediaLibrary from "expo-media-library";
const Container = styled(View)`
  flex: 1;
`;
const PageTitle = styled(Text)`
  font-size: 24px;
`;
// My Gallery Photo styled-component
const PhotoBtn = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
`;
const PhotoImg = styled(Image)`
  width: 100%;
  height: 100%;
`;
//select Photo
const SelectedPhoto = styled(View)`
  width: 200px;
  height: 200px;
`;
const SelectedPhotoImg = styled(Image)`
  width: 100%;
  height: 100%;
`;
//한 줄에 띄울 Gallery Photo 사진 수
const numColumns = 3;
//state는 'useState' 라는 Hook을 이용해 만듬
export default () => {
  //Hook 사용법 반드시 use~~로 시작하는 Hook을 만들어야함,사용할땐 항상 최상위 컴포넌트에서 사용되어야함
  //갤러리에서 사진 불러오는 함수
  //A.로딩 여부
  const [loading, setLoding] = useState<boolean>();
  //B.갤러리에서 불러온 사진들
  const [myPhotos, setMyPhotos] = useState<DummyDataType[]>([]);
  //C.불러온 사진 중 선택한 사진들
  const [selectedPhotos, setSelectedPhotos] = useState<DummyDataType[]>([]);
  //Hook:스마트폰 화면 넓이를 가져오는 기능
  const { width: WIDTH } = useWindowDimensions();
  // Gallery Photo Size(in Flat List)
  const itemSize = WIDTH / numColumns;
  //불러온 사진 선택하기
  const onSelectPhoto = (newPhoto: DummyDataType) => {
    //내가선택한 사진이 추가된 새로운 리스트 생성
    // ... ?? : Spread 문법. 배열/리스트에 요소를 모두 꺼내준다.
    //selectedPhotos state에 선택한 사진을 추가
    const newPhotos = [...selectedPhotos, newPhoto];
    setSelectedPhotos(newPhotos);
  };
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
    setMyPhotos(DummyPhotoDatas);
    //final: 로딩 종료
    setLoding(false);
  };
  //현재 페이지 접속 시, 1번 실행되는 Hook
  useEffect(() => {
    //3초후에 사진불러오기 실행
    setTimeout(() => {
      getMyPhotos();
    }, 500);
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      {/*A.내가 선택한 사진들 보여줄 가로 Scroll*/}
      {/*map:selectedPhotos가  가지고 있는 데이터 만큼 반복 */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {selectedPhotos.map((photo) => {
          return (
            <SelectedPhoto>
              <SelectedPhotoImg source={{ uri: photo.uri }} />
            </SelectedPhoto>
          );
        })}
      </ScrollView>
      {/*B.내 갤러리의 사진들 보여줄 세로 FlatList*/}
      <FlatList
        numColumns={numColumns} /**한 줄에 띄울 아이템 갯수*/
        data={myPhotos} /**스크롤 할 데이터 */
        /**renderItem : 데이터를 어떻게 보여줄지 */
        renderItem={({ item }) => {
          return (
            <PhotoBtn
              onPress={() => onSelectPhoto(item)}
              style={{ width: itemSize, height: itemSize }}
            >
              <PhotoImg source={{ uri: item.uri }} />
            </PhotoBtn>
          );
        }}
      />
    </Container>
  );
};
// DummyData의 타입 만들기 버전1 type 조금더 확장성이 있음
type DummyDataType = {
  id: string;
  uri: string;
};

//[Type] => union 어떤타입의 값을 제한
type AlignItemsType = "center" | "flex-end" | "flex-start";
const style: AlignItemsType = "center";

// DummyData의 타입 만들기 버전2 interface 조금 국소적
interface IDummyData {
  id: string;
  uri: string;
}
// DummyData // 변수 뒤에 : 타입 넣어 넣고싶은 데이터의 타입을 지정 가능
const DummyPhotoDatas: DummyDataType[] = [
  {
    id: "1",
    uri: "https://imagescdn.gettyimagesbank.com/500/202107/jv12378806.jpg",
  },
  {
    id: "2",
    uri: "https://cdn.pixabay.com/photo/2023/03/10/16/47/background-7842730_1280.jpg",
  },
  {
    id: "3",
    uri: "https://cdn.pixabay.com/photo/2023/12/18/14/30/winter-8456170_640.png",
  },
  {
    id: "4",
    uri: "https://cdn.pixabay.com/photo/2021/07/31/18/44/ellipse-6512786_640.jpg",
  },
  {
    id: "5",
    uri: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg",
  },
  {
    id: "6",
    uri: "https://cdn.pixabay.com/photo/2016/09/29/13/08/planet-1702788_640.jpg",
  },
  {
    id: "7",
    uri: "https://cdn.pixabay.com/photo/2021/09/25/18/04/orange-flowers-6655548_640.jpg",
  },
  {
    id: "8",
    uri: "https://cdn.pixabay.com/photo/2022/10/18/18/49/alps-7530950_640.jpg",
  },
  {
    id: "9",
    uri: "https://cdn.pixabay.com/photo/2022/08/13/05/19/flowers-7382926_640.jpg",
  },
  {
    id: "10",
    uri: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg",
  },
];
