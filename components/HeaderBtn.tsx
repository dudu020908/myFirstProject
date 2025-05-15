import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

const BtnContainer = styled(TouchableOpacity)`
  padding: 10px 15px;
`;

const Title = styled(Text)`
  font-size: 18px;
  color: dodgerblue;
  font-weight: bold;
`;
//전달받을 props의 타입
type Props = {
  /** 버튼의 타이틀 */
  title: string;
  /** 버튼이 눌려졌을때 실행시킬 함수 */
  onPress: () => void;
};
//괄호 안에 타이틀,눌렀을때 실행할 코드 넣음
export default ({ title, onPress }: Props) => {
  return (
    <BtnContainer onPress={onPress}>
      <Title>{title}</Title>
    </BtnContainer>
  );
};
