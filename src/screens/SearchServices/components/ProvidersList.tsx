import UserService from '@Api/services/userService'
import InfoCardIcon from '@Components/atomic/InfoCardIcon/InfoCardIcon'
import { useAppSelector } from '@Hooks/redux'
import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'

const CardContainer = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
`
const ProvidersList: React.FC = () => {
  const [providers, setProviders] = useState<any[]>([])
  const { token } = useAppSelector(({ auth }) => auth)

  async function getAllProviders() {
    const providersSearched = await UserService.getAllProviders(token!.value)
    setProviders(providersSearched)
  }

  useEffect(() => {
    getAllProviders()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, width: '100%' }}>
      <FlatList
        style={{ paddingHorizontal: 24 }}
        data={providers}
        renderItem={({ item }) => (
          <CardContainer>
            <InfoCardIcon
              title={item.name}
              subtitle={item.name}
              size={''}
              icon={<FontAwesome name="file-image-o" size={24} color="black" />}
              bgColor={false}
            />
          </CardContainer>
        )}
      />
    </SafeAreaView>
  )
}

export default ProvidersList
