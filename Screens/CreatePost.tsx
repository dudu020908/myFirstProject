import { useEffect, useLayoutEffect, useState } from "react";
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
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NaviProps } from "../stacks/MainStack";
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
//select Icon
const InnerCircle = styled(View)`
  width: 25px;
  height: 25px;
  background-color: #f5deb383;
  position: absolute;
  border-radius: 50%;
  margin: 5px;
  right: 0px;
  justify-content: center;
  align-items: center;
`;
const SelectIcon = styled(Image)`
  width: 100%;
  height: 100%;
`;

const AlbumMenuTitle = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  color: black;
  margin: 15px 20px;
`;

const NextHeaderBtn = styled(TouchableOpacity)`
  padding: 5px 15px;
`;
const NextHeaderTitle = styled(Text)`
  color: dodgerblue;
  font-size: 18px;
  font-weight: 600;
`;

//한 줄에 띄울 Gallery Photo 사진 수
const numColumns = 3;
//state는 'useState' 라는 Hook을 이용해 만듬
export default () => {
  //Hook 사용법 반드시 use~~로 시작하는 Hook을 만들어야함,사용할땐 항상 최상위 컴포넌트에서 사용되어야함
  //갤러리에서 사진 불러오는 함수
  //A.로딩 여부
  const [loading, setLoading] = useState<boolean>();
  //B.갤러리에서 불러온 사진들
  const [myPhotos, setMyPhotos] = useState<DummyDataType[]>([]);
  //C.불러온 사진 중 선택한 사진들
  const [selectedPhotos, setSelectedPhotos] = useState<DummyDataType[]>([]);
  //Hook:스마트폰 화면 넓이를 가져오는 기능
  const { width: WIDTH } = useWindowDimensions();

  //Hook : 페이지 이동을 하기 위한 네비게이션 훅
  const navi = useNavigation<NaviProps>();

  // Gallery Photo Size(in Flat List)
  const itemSize = WIDTH / numColumns;
  //Selected Photo Size(in ScrollView)
  const photoSize = WIDTH * 0.75;
  const photoPadding = (WIDTH - photoSize) / 2;

  //내가 선택한 사진인지 여부 확인 : boolean 으로 true/false 인 경우만 나오게 (다른값일경우 에러나옴)
  const isSelect = (Photo: DummyDataType): boolean => {
    const findPhotoIndex = selectedPhotos.findIndex(
      (asset) => asset.id === Photo.id
    );
    //findPhoto : 0보다 작으면 내가 선택하지않은것 -> false
    //findphoto : 0이거나 0보다 크면 내가 선택한것 -> true
    //삼항 연산자를 이용해 조건 ? 참일때 리턴 : 거짓일때 리턴 사진인지 아닌지 여부
    return findPhotoIndex < 0 ? false : true;
  };

  //불러온 사진 선택하기
  const onSelectPhoto = (Photo: DummyDataType) => {
    //1. 선택한 사진인지 아닌지 확인
    //=> photo 가 selectedphotos 안에 존재하는지 확인하자
    /* 옛 코드 자바스크립트 x let isSelected = false;
    for (let i = 0; i < selectedPhotos.length; i++) {
      if(selectedPhotos[i].id === Photo.id){
        isSelected = true;
        break;
      }
    }*/
    //자바스크립트의 방법 배열에서 조건에 맞는 인덱스 값을 찾아 그 인덱스가 있을때 그 인덱스를 리턴 없으면 -1 리턴
    const findPhotoIndex = selectedPhotos.findIndex(
      (asset) => asset.id === Photo.id
    );

    //A. 한 번도 선택하지 않은 사진 => 선택 사진 리스트에 추가
    if (findPhotoIndex < 0) {
      const newPhotos = [...selectedPhotos, Photo];
      setSelectedPhotos(newPhotos);
    }
    //B. 이미 선택 사진 => 선택한 사진 리스트에서 삭제
    else {
      // 지우고싶은 사진 인덱스 번호 알아오기 findPhotoIndex에 존재
      const removePhotos = selectedPhotos.concat();
      const deletecount = 1;
      // 선택한 사진 리스트에서 해당인덱스번호의 사진 리스트에서 제거
      removePhotos.splice(findPhotoIndex, deletecount);
      // 해당 사진이 지워진 새로운 리스트로 갱신하기
      setSelectedPhotos(removePhotos);
    }
    //concat 방식으로 하거나 마지막 setSelectedPhotos([...removePhotos])방법으로 할 수 있다.
    //내가선택한 사진이 추가된 새로운 리스트 생성
    // ... ?? : Spread 문법. 배열/리스트에 요소를 모두 꺼내준다.
    //selectedPhotos state에 선택한 사진을 추가
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
    setLoading(false);
  };
  //현재 페이지 접속 시, 1번 실행되는 Hook
  useEffect(() => {
    //3초후에 사진불러오기 실행
    setTimeout(() => {
      getMyPhotos();
    }, 500);
  }, []);
  //헤더 스타일 변경위해 사용하는 Hook
  useLayoutEffect(() => {
    //페이지 이동 위한 함수 + 데이터 전달
    //[*문제 발생] : 페이지 생성 시, 비어있는 selectedphotos 를 1번 집어넣고
    //끝나버리기 때문에 나중에 사진을 선택하더라도 값이 갱신되지않는다...
    //그렇기 때문에 의존성 배열에 ()=>{}[selectedPhotos]를 넣어
    //안의 값이 사진을 선택할때마다 새로 실행되어 갱신되도록 코드를 수정한다.
    const goTo = () => {
      //선택한 사진이 없으면 이동X 및 알림
      if (selectedPhotos.length < 1) {
        Alert.alert("알림", "선택한 사진이 없습니다.사진을 선택해주세요");
        return;
      }
      //페이지 이동
      navi.navigate("UploadPost", {
        assets: selectedPhotos,
      });
    };
    //네비게이션 훅 사용해 헤더 접근
    navi.setOptions({
      headerRight: () => (
        <NextHeaderBtn onPress={goTo}>
          <NextHeaderTitle>Next</NextHeaderTitle>
        </NextHeaderBtn>
      ),
    });
  }, [selectedPhotos]); //[]는 의존성배열 비어있다면,컴포넌트 생성될때 딱 한번 함수 실행, 배열 안에 조건있을시 한번 더 실행
  //useEffect는 ui를 그릴때, 코드계산 끝나고 사용
  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      {/*A.내가 선택한 사진들 보여줄 가로 Scroll*/}
      {/*map:selectedPhotos가  가지고 있는 데이터 만큼 반복 */}
      <ScrollView
        style={{ width: WIDTH, height: WIDTH }}
        contentContainerStyle={{
          paddingHorizontal: photoPadding,
          gap: 10,
          alignItems: "center",
        }}
        snapToInterval={photoSize + 10}
        decelerationRate={"fast"}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {selectedPhotos.map((photo, index) => {
          return (
            //photo.id로 해도되고,id값이 없다면map에 index도 넣고 index로 해도된다
            <SelectedPhoto
              key={index}
              style={{ width: photoSize, height: photoSize }}
            >
              <SelectedPhotoImg source={{ uri: photo.uri }} />
            </SelectedPhoto>
          ); //flat scroll 차이점  스크롤은 전부 읽고 한번에 보여줌, flat은 쪼개서 보내줌
        })}
      </ScrollView>
      <AlbumMenuTitle>최근 순▼</AlbumMenuTitle>
      {/*B.내 갤러리의 사진들 보여줄 세로 FlatList*/}
      <FlatList
        //keyExtractor={(item) => item.id}
        //id값이 없다면 아래처럼 써도된다.
        keyExtractor={(item, index) => index.toString()}
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
              {isSelect(item) && (
                <InnerCircle>
                  <FontAwesome name="check" size={24} color={"black"} />
                </InnerCircle>
              )}
            </PhotoBtn>
          );
        }}
      />
    </Container>
  );
};
/*<SelectIcon FontAwesome 대신
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/5291/5291043.png",
                    }}
                  />*/
// DummyData의 타입 만들기 버전1 type 조금더 확장성이 있음
export type DummyDataType = {
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
