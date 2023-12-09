import InfoCardIcon from '@Components/atomic/InfoCardIcon/InfoCardIcon'
import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { setSelectedProviderIndex } from '@Store/reducers/services'

const CardContainer = styled.View`
  flex-direction: row;
`
const ProvidersList: React.FC = () => {
  const { providers } = useAppSelector(({ services }) => services)
  const navigation = useNavigation()
 
  const dispatch = useAppDispatch()

  function handleOnPressSendContract(index: number) {
    dispatch(setSelectedProviderIndex(index))
    navigation.navigate('SendContract')
  }  
  return (
    <FlatList
      data={providers}
      renderItem={({ item, index }) => (
        <CardContainer>
          <InfoCardIcon
            title={item.name + ' ' + item.surname}
            subtitle={`${item.averageRating == 0 ? '-': item.averageRating}⭐`}
            size={''}
            icon={<AntDesign name="infocirlce" size={24} color="black" />}
            secondIcon={<FontAwesome name="send-o" size={24} color="black" />}
            bgColor={false}
            onPress={() => {
              handleOnPressSendContract(index)
            }}
          />
        </CardContainer>
      )}
    />
  )
}

export default ProvidersList
