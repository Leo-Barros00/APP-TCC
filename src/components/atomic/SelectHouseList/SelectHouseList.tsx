import { FlatList } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { useAppSelector } from '@Hooks/redux'
import SelectHouseItem from '../SelectHouseItem/SelectHouseItem'
import { SelectHouseListProps } from './interface'

const HouseSelectContainer = styled.View`
  width: 100%;
  border-radius: 22px;
  border: 2px solid gray;
  max-height: 50%;
  margin-top: 12px;
`

const SelectHouseList: React.FC<SelectHouseListProps> = ({ onPress }) => {
  const {
    user: { houses },
  } = useAppSelector((state) => state)

  return (
    <HouseSelectContainer>
      <FlatList
        data={houses}
        renderItem={({ item: { id, address } }) => (
          <SelectHouseItem address={address} onPress={() => onPress(id)} />
        )}
      />
    </HouseSelectContainer>
  )
}

export default SelectHouseList
