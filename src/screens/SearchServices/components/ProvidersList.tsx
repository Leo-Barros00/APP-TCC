import UserService from '@Api/services/userService'
import { useAppSelector } from '@Hooks/redux'
import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
          <View
            style={{
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 8,
              width: '100%',
              flexDirection: 'row',
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Text>{item.name}</Text>
            <Text>{item.surname}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default ProvidersList
