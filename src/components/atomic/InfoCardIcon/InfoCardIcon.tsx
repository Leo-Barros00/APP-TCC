import styled from 'styled-components/native'
import { IInfoCardIcon } from './interface'
import { View } from 'react-native'

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors['primary']['main']};
  border-radius: 8px;
  margin-top: 24px;
`

const TextContainer = styled.View`
  width: 100%;
  align-items: center;
`

const Title = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-SemiBold';

  color: black;
`

const Subtitle = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-SemiBold';

  color: black;
`

const InfoCardIcon: React.FC<IInfoCardIcon> = ({ title, subtitle, icon }) => {
  return (
    <Container>
      <View>{icon}</View>
      <TextContainer>
        <Title numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Title>
        <Subtitle numberOfLines={1} ellipsizeMode="tail">
          {subtitle}
        </Subtitle>
      </TextContainer>
    </Container>
  )
}

export default InfoCardIcon
