import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertProviders, setSelectedHouse } from '@Store/reducers/services'
import SelectHouseButton from '../SelectHouseButton/SelectHouseButton'
import LottieView from 'lottie-react-native'
import SelectHouseList from '../SelectHouseList/SelectHouseList'
import ProviderService from '@Api/services/providerService'
import ProvidersList from '@Screens/SearchServices/components/ProvidersList'

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
  padding: 0 16px;
  align-items: center;
`

const ServicesList = () => {
  const {
    services: { houseSelected, providers },
  } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  const [isSelectOpen, setIsSelectOpen] = useState(false)

  function handleOnPressSelectHouse() {
    setIsSelectOpen((prevState) => !prevState)
  }

  function handleOnPressHouseItem(houseId: string) {
    setIsSelectOpen(false)
    dispatch(setSelectedHouse(houseId))
  }

  useEffect(() => {
    async function getProviders() {
      if (houseSelected === null) return

      const response = await ProviderService.getProvidersByHouse(houseSelected)
      dispatch(insertProviders(response.providers))
    }

    getProviders()
  }, [houseSelected])

  return (
    <SafeAreaContainer>
      <SelectHouseButton onPress={handleOnPressSelectHouse} />
      {isSelectOpen && <SelectHouseList onPress={handleOnPressHouseItem} />}
      {houseSelected ? (
        providers === null ? (
          <LottieView
            style={{ height: 120, width: 120 }}
            source={require('./loading_dots_animation.json')}
            autoPlay
            loop={true}
          />
        ) : (
          <ProvidersList />
        )
      ) : (
        <></>
      )}
    </SafeAreaContainer>
  )
}

export default ServicesList
