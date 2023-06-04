import React from 'react'
import styled from 'styled-components/native'
import { SelectHouseButtonProps } from './interface'
import { useAppSelector } from '@Hooks/redux'

const HouseSelectButton = styled.TouchableOpacity<{ selected: boolean }>`
  width: 100%;
  border-radius: 36px;
  padding: 12px 16px;

  border: 2px solid
    ${({ selected, theme }) => (selected ? theme.colors.primary.main : 'gray')};
`

const HouseSelectButtonText = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 16px;
`

const SelectHouseButton: React.FC<SelectHouseButtonProps> = ({ onPress }) => {
  const {
    user: { houses },
    services: { houseSelected },
  } = useAppSelector((state) => state)

  function getHouseDescriptionById(houseId: string) {
    const house = houses.find(({ id }) => id === houseId)

    return `${house?.address.description}, ${house?.address.number}`
  }

  return (
    <HouseSelectButton onPress={onPress} selected={!!houseSelected}>
      <HouseSelectButtonText>
        {houseSelected
          ? getHouseDescriptionById(houseSelected)
          : 'Selecione a casa para o serviço'}
      </HouseSelectButtonText>
    </HouseSelectButton>
  )
}

export default SelectHouseButton
