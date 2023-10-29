import styled from 'styled-components/native'
import { IContractCard } from './interface'
import { getDateString, getTimeString } from '@Utils/date'
import { useState } from 'react'
import { Animated, Easing } from 'react-native'

const CardTitle = styled.Text`
  font-size: 24px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const CardOwnerName = styled.Text`
  font-size: 20px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const CardDescription = styled.Text`
  font-size: 16px;
  line-height: 30px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const CardLocale = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const ProposalCard = styled.TouchableOpacity`
  min-height: 180px;
  flex-direction: row;
  border-top-width: 4px;
  border-top-color: ${({ theme }) => theme.colors['primary']['main']};
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  justify-content: space-between;
`

const LeftContainerCard = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const HouseInfoCard = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
`

const LocaleContainerCard = styled.View`
  justify-content: flex-end;
  align-items: center;
`

const InfoContainerCard = styled.View`
  justify-content: space-between;
`

const NameDescriptionContainer = styled.View`
  justify-content: flex-start;
`

const ConfirmContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-top: 16px;
  margin-top: 4px;
  padding-bottom: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-color: ${({ theme }) => theme.colors['primary']['main']};
  background-color: white;
  opacity: 0.75;
`

const AcceptButton = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const DeclineButton = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-left-width: 1px;
  border-left-color: ${({ theme }) => theme.colors['primary']['main']};
`

const ButtonAcceptText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';

  color: ${({ theme }) => theme.colors['primary']['main']};
`

const ButtonDeclineText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';

  color: ${({ theme }) => theme.colors['error']['main']};
`

const ContractCard: React.FC<IContractCard> = ({
  value,
  icon,
  houseSize,
  contractorName,
  jobDescription,
  locale,
  date,
  onPress,
  onPressAccept,
  onPressDecline,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const position = new Animated.Value(0)

  const leftAnimation = () => {
    setTimeout(() => {
      Animated.timing(position, {
        toValue: -1000,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start()
    }, 300)
  }
  const rightAnimation = () => {
    setTimeout(() => {
      Animated.timing(position, {
        toValue: 1000,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start()
    }, 300)
  }

  return (
    <Animated.View
      style={[{ marginBottom: 24 }, { transform: [{ translateX: position }] }]}
    >
      <ProposalCard
        onPress={() => {
          onPress
          setShowConfirmation(!showConfirmation)
        }}
        style={{
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.17,
          shadowRadius: 2.54,
          elevation: 3,
        }}
      >
        <LeftContainerCard>
          <CardTitle>{value}</CardTitle>
          <HouseInfoCard>
            {icon}
            <CardDescription>{houseSize + ' m²'}</CardDescription>
          </HouseInfoCard>
          <CardDescription>
            {getDateString(date) + ' - ' + getTimeString(date)}
          </CardDescription>
        </LeftContainerCard>

        <InfoContainerCard>
          <NameDescriptionContainer>
            <CardOwnerName>{contractorName}</CardOwnerName>
            <CardDescription>{'"' + jobDescription + '"'}</CardDescription>
          </NameDescriptionContainer>

          <LocaleContainerCard>
            <CardLocale>{locale}</CardLocale>
          </LocaleContainerCard>
        </InfoContainerCard>
      </ProposalCard>
      {showConfirmation && (
        <ConfirmContainer>
          <AcceptButton
            onPress={() => {
              leftAnimation()
              onPressAccept()
            }}
          >
            <ButtonAcceptText>Aceitar</ButtonAcceptText>
          </AcceptButton>
          <DeclineButton
            onPress={() => {
              rightAnimation()
              onPressDecline()
            }}
          >
            <ButtonDeclineText>Recusar</ButtonDeclineText>
          </DeclineButton>
        </ConfirmContainer>
      )}
    </Animated.View>
  )
}

export default ContractCard
