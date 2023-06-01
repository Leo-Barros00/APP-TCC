import styled from 'styled-components/native'
import { IInfoCardIcon } from './interface'
import { Feather } from '@expo/vector-icons'

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 16px;
  justify-content: space-between;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors['primary']['main']};
  border-radius: 8px;
  margin-top: 24px;
`

const TextContainer = styled.View`
  /* width: 100%; */
  padding-left: 36px;
  align-items: flex-start;
  justify-content: center;
  color: ${({ theme }) => theme.colors['primary']['main']};
`

const FirstContainer = styled.View`
  /* width: 100%; */
  flex-direction: row;
  justify-content: center;
`

const IconContainer = styled.View`
  /* width: 100%; */
  justify-content: center;
  align-items: center;
`

const EditButton = styled.TouchableOpacity`
  padding-left: 48px;
  align-items: flex-start;
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

const Size = styled.Text`
  font-size: 14px;
  font-family: 'Poppins-SemiBold';

  color: black;
`

const InfoCardIcon: React.FC<IInfoCardIcon> = ({ title, subtitle, icon, size }) => {
  return (
    <Container>
      <FirstContainer>
        <IconContainer>
          {icon}
          <Size>{size} m²</Size>
        </IconContainer>
        <TextContainer>
          <Title numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Title>
          <Subtitle numberOfLines={1} ellipsizeMode="tail">
            {subtitle}
          </Subtitle>
        </TextContainer>
      </FirstContainer>

      <EditButton
        onPress={() => {
          console.log('vai editar')
        }}
      >
        <Feather name="edit" size={24} color="black" />
      </EditButton>
    </Container>
  )
}

export default InfoCardIcon
