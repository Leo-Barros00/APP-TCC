import styled from 'styled-components/native'
import { IIconButton } from './interface'

const Container = styled.TouchableOpacity<{ size?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.size ? props.size : 24)}px;
  height: ${(props) => (props.size ? props.size : 24)}px;
`

const IconButton: React.FC<IIconButton> = ({ icon, onPress, size }) => {
  return (
    <Container size={size} onPress={onPress}>
      {icon}
    </Container>
  )
}

export default IconButton
