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
