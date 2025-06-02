/**
 * 함수 설명 : asset을 Blob 데이터로 변환 하는 함수
 * @param uri 파라미터 설명 : 특정 asset, photo등의 uri 값
 * @returns 반환값 설명 : blob(Binnary Large OBject) 데이터 반환
 */
export const assetToBlob = async (uri: string) => {
  // fetch 함수를 활용하여 blob 데이터로 바꾸기 위한 응답 데이터 받음
  const response = await fetch(uri);
  // 응답 데이터로 부터 blob 데이터 생성
  const blob = await response.blob();
  // 생성된 blob 데이터 반환
  return blob;
};
