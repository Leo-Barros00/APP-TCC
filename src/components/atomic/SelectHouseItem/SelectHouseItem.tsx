import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { SelectHouseItemProps } from './interface'

const HouseItems = styled.TouchableOpacity`
  padding: 12px 16px;
  border-bottom: 1px solid black;
`

const HouseItemText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-Medium';
`

const SelectHouseItem: React.FC<SelectHouseItemProps> = ({ onPress, address }) => {
  return (
    <HouseItems onPress={onPress}>
      <HouseItemText>{`${address.description}, ${address.number}`}</HouseItemText>
      <HouseItemText>{address.neighborhood.name}</HouseItemText>
    </HouseItems>
  )
}

export default SelectHouseItem
