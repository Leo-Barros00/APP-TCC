import { useAppSelector } from '@Hooks/redux'
import React from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import InfoCardIcon from '@Components/atomic/InfoCardIcon/InfoCardIcon'
import { MaterialIcons } from '@expo/vector-icons'
import TextButton from '@Components/atomic/TextButton/TextButton'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

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
  padding: 8px;
  color: ${({ theme }) => theme.colors.primary.main};
`

const EmptyListView = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  margin-top: 240px;
`

const HousesList: React.FC = () => {
  const { houses } = useAppSelector(({ user }) => user)
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScreenTitle>{'Aqui está a lista das suas casas cadastradas!'}</ScreenTitle>
        <FlatList
          style={{ width: '100%', marginBottom: 120 }}
          data={houses}
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
          renderItem={({ item }) => (
            <InfoCardIcon
              title={item.address.description + ', ' + item.address.number}
              subtitle={item.address.neighborhood.name}
              size={item.metersBuilt + ' m²'}
              icon={<MaterialIcons name="house" size={32} color="black" />}
              secondIcon={<Feather name="edit" size={24} color="black" />}
              bgColor={false}
              onPress={() => {}}
            />
          )}
        />
        <View style={{ width: '100%', position: 'absolute', bottom: 16 }}>
          <TextButton text="Voltar" variant="primary" onPress={navigation.goBack} />
        </View>
      </Container>
    </SafeAreaView>
  )
}

export default HousesList
