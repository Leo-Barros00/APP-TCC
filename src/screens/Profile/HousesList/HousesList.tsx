import HouseService from '@Api/services/houseService'
import { useAppSelector } from '@Hooks/redux'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import InfoCardIcon from '@Components/atomic/InfoCardIcon/InfoCardIcon'
import { MaterialIcons } from '@expo/vector-icons'
import TextButton from '@Components/atomic/TextButton/TextButton'
import { useNavigation } from '@react-navigation/native'

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 16px;
`

const ScreenTitle = styled.Text`
  font-size: 26px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
  margin-bottom: 32px;
`

const EmptyListText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
  text-align: center;

  padding: 8px 8px;
  color: ${({ theme }) => theme.colors['primary']['main']};
`

const EmptyListView = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  margin-top: 240px;
`

const HousesList: React.FC = () => {
  const { token } = useAppSelector(({ auth }) => auth)
  const user = useAppSelector(({ user }) => user)
  const [houses, setHouses] = useState()
  const [loading, setLoading] = useState<boolean>(true)
  const navigation = useNavigation()

  async function getAllHouses() {
    const searchedHouses = await HouseService.getHouses(token!.value)
    setHouses(searchedHouses)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    getAllHouses()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScreenTitle>{'Aqui está a lista das suas casas cadastradas!'}</ScreenTitle>
        {loading && (
          <LottieView
            style={{ height: 120, width: 120 }}
            source={require('./loading_dots_animation.json')}
            autoPlay
            loop={true}
          />
        )}
        {!loading && (
          <FlatList
            style={{ width: '100%', marginBottom: 120 }}
            data={user.houses}
            ListEmptyComponent={() => (
              <EmptyListView>
                <LottieView
                  style={{ height: 120, width: 120 }}
                  source={require('./empty-list.json')}
                  autoPlay
                  loop={true}
                />
                <EmptyListText>{'Você não possui casas cadastradas!'}</EmptyListText>
              </EmptyListView>
            )}
            renderItem={({ item }) => {
              return (
                <InfoCardIcon
                  title={item.address.description + ', ' + item.address.number}
                  subtitle={item.address.neighborhood.name}
                  size={item.metersBuilt}
                  icon={<MaterialIcons name="house" size={32} color="black" />}
                  bgColor={false}
                />
              )
            }}
          />
        )}
        <View style={{ width: '100%', position: 'absolute', bottom: 16 }}>
          <TextButton
            text="Voltar"
            variant="primary"
            onPress={() => navigation.goBack()}
          />
        </View>
      </Container>
    </SafeAreaView>
  )
}

export default HousesList
