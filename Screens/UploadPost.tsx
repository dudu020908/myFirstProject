import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
import styled from "styled-components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackScreenList } from "../stacks/MainStack";
import { TextInput } from "react-native-gesture-handler";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderBtn from "../components/HeaderBtn";
import { auth, storage } from "../firebaseConfig";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { firestore as firestoreDB } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { assetToBlob } from "../utils";
const photoStyles = [
  { top: 10, right: 10, zIndex: 4 },
  { top: 7, right: 7, zIndex: 3 },
  { top: 5, right: 5, zIndex: 2 },
  { top: 3, right: 3, zIndex: 1 },
  { top: 0, right: 0, zIndex: 0 },
];

const Container = styled(View)`
  background-color: black;
  flex: 1;
`;
const Title = styled(Text)``;

const UploadBox = styled(View)`
  flex-direction: row;
`;
const Caption = styled(View)`
  flex: 1;
`;
const Input = styled(TextInput)`
  color: white;
  font-size: 20px;
  padding: 10px;
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
const LoadingBox = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #ff000000;
`;

// 네비게이션은 네비게이션 화면이동 스택스크린 프롭스는 받아온값 화면에띄울때

//route.params -> useNavigation 에서 전달받은 데이터가 들어있음
export default ({
  route: { params },
}: NativeStackScreenProps<MainStackScreenList, "UploadPost">) => {
  //어떤 이유로 params.assets 값이 null 일경우 [] 빈 배열을 할당한다는 삼항 연산자.
  const assets = params.assets ?? [];
  //input Text (Caption) 관리하는 State
  const [caption, setCaption] = useState<string>("");
  //Hook: Loading State
  const [loading, setLoading] = useState<boolean>();
  //input Text 입력/변경 시, State에 반영
  const onChangeCaption = (text: string) => {
    //추출한 Text 를 State에 저장
    setCaption(text);
  };
  const navi = useNavigation();
  //Header Right 만들기 위해 useLayoutEffect랜더링 되기전 1번 실행  useLayoutEffect(() => {}, []);
  // 사진 & 글을 업로드 하기 위한 함수
  const onUpload = async () => {
    //[방어코드] text 작성 안한 경우엔 작성 하도록 알람을 보냄,
    if (caption.trim() === "") {
      Alert.alert("글을 작성해 주셔야합니다");
      return;
    } //로딩시작
    if (loading) {
      Alert.alert("로딩중입니다.");
      return;
    }
    setLoading(true);
    try {
      // server 에 데이터 업로드
      // - 업로드 할 데이터 (asset, caption등)
      const uploadData = {
        //작성글
        caption: caption,
        //작성자
        userId: auth.currentUser?.uid,
        //작성날짜
        createAt: Date.now(),
        //닉네임
        nickname: auth.currentUser?.displayName,
      };
      // - 업로드할 DB의 경로
      // (어떤DB, 어떤컬렉션이름)
      const path = collection(firestoreDB, "posts");
      // - db 의 해당 경로에 데이터 업로드
      const doc = await addDoc(path, uploadData);
      // - firebase Storage에 이미지를 URL형식으로 변환(Convert)하여 업로드
      // 여러 사진들을 URL형식으로 변환(Convert)하여 업로드 할 배열 생성하기
      const photoURLs = [];
      // 여러 사진들을 반복하여 서버에 업로드 하고, 배열에 넣음
      for (const asset of assets) {
        // ㄴ 여러 사진들 서버(storage)에 업로드,
        // - path
        const path = `posts/${auth.currentUser?.uid}/${doc.id}/${asset}.png`;
        const locationRef = ref(storage, path);
        // - blob 형태 추가 변환
        const blob = await assetToBlob(asset.uri);
        // - 서버 업로드
        const result = await uploadBytesResumable(locationRef, blob);
        // ㄴ 서버에 업로드할 사진들을 URL로 변환
        const url = await getDownloadURL(result.ref);
        // ㄴ URL 로 변환된 사진들을 배열에 추가
        photoURLs.push(url);
      }
      // URL로 변환된 사진을 모아둔 배열을 서버에 업로드
      await updateDoc(doc, { photos: photoURLs });
      // server에 정상적으로 업로드 완료시 로딩을 종료
      setLoading(false);
    } catch (error) {
      // Exception(예외) 업로드 실패시 Error
      Alert.alert("Error", `${error}`);
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    //Header 수정/편집 need to Navigation
    navi.setOptions({
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "white",
      headerRight: () => <HeaderBtn title="Upload" onPress={onUpload} />,
    });
  }, [loading, caption, assets]);
  return (
    <Container>
      <Title>Upload Post Page</Title>
      <UploadBox>
        <PhotoBox>
          {/*{assets.length > 1 && (
            <AntDesign
              style={{ position: "absolute", right: 0, margin: 6 }}
              name="switcher"
              size={25}
              color={"white"}
            />
            <Photo source={{ uri: assets[0].uri }} />
          <Photo
            style={{ position: "absolute", right: 5, top: 5 }}
            source={{ uri: assets[1].uri }}
          />
          )}*/}
          {[0, 1, 2, 3, 4].map(
            (i) =>
              assets[i] && (
                <Photo
                  key={i}
                  source={{ uri: assets[i].uri }}
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    ...photoStyles[i],
                  }}
                />
              )
          )}

          <PhotoBlack />
        </PhotoBox>

        {/*글 작성 하는 영역 */}
        <Caption>
          <Input
            multiline={true}
            value={caption}
            placeholder="글을 작성해 주세요..."
            placeholderTextColor={"#333"}
            onChangeText={(text) => onChangeCaption(text)}
          />
        </Caption>
      </UploadBox>
      {/*업로드중.. 로딩화면 */}
      {loading && (
        <LoadingBox>
          <ActivityIndicator size={"large"} color={"white"} />
          <Text>Uploading...</Text>
        </LoadingBox>
      )}
    </Container>
  );
};
