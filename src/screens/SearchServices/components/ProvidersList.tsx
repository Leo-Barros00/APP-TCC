import InfoCardIcon from '@Components/atomic/InfoCardIcon/InfoCardIcon'
import { useAppSelector } from '@Hooks/redux'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const CardContainer = styled.View`
  flex-direction: row;
`
const ProvidersList: React.FC = () => {
  const { providers } = useAppSelector(({ services }) => services)

  return (
    <FlatList
      style={{ paddingHorizontal: 16 }}
      data={providers}
      renderItem={({ item }) => (
        <CardContainer>
          <InfoCardIcon
            title={item.name + ' ' + item.surname}
            subtitle={'⭐ ⭐ ⭐ ⭐ ⭐'}
            size={''}
            icon={<AntDesign name="infocirlce" size={24} color="black" />}
            secondIcon={<FontAwesome name="send-o" size={24} color="black" />}
            bgColor={false}
          />
        </CardContainer>
      )}
    />
  )
}

export default ProvidersList
