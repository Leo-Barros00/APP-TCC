import React, { useState } from 'react'
import { View } from 'react-native'

import TextButton from '@Components/atomic/TextButton'
import Modal from '@Components/atomic/Modal'

import { ISelect } from './interface'
import styled, { css, useTheme } from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

const SelectItems = styled.View`
  padding: 12px 16px;
  border-bottom: 1px solid black;
  flex-direction: row;
  justify-content: space-between;
  min-width: 120px;
`

const SelectItemsText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-SemiBold';
`

const SelectContainer = styled.TouchableOpacity<{ selected: boolean }>`
  width: 100%;
  border-radius: 36px;
  border: ${(props) => (props.selected ? '2px solid #3030C2' : '2px solid gray')};
`

const Select: React.FC<ISelect> = ({
  isButton = true,
  title,
  options,
  selectedOption,
  onSelect,
  disabled,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handleOnPressSelectButton() {
    setIsModalVisible(true)
  }

  function handleOnPressOptionButton(optionId: string) {
    onSelect(optionId)
    setIsModalVisible(false)
  }

  const selectedOptionObject = options?.find(({ id }) => id === selectedOption)

  return (
    <View>
      {isButton ? (
        <TextButton
          text={selectedOptionObject ? selectedOptionObject.value : title}
          variant="primary"
          onPress={handleOnPressSelectButton}
          disabled={disabled}
          ghost={!!selectedOptionObject}
        />
      ) : (
        <SelectContainer
          selected={!!selectedOptionObject}
          onPress={handleOnPressSelectButton}
        >
          <SelectItems>
            <SelectItemsText>
              {selectedOptionObject ? selectedOptionObject.value : title}
            </SelectItemsText>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </SelectItems>
        </SelectContainer>
      )}

      <Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title={title}
      >
        {options?.map(({ id, value }) => (
          <TextButton
            key={id}
            variant="primary"
            text={value}
            onPress={() => handleOnPressOptionButton(id)}
          />
        ))}
      </Modal>
    </View>
  )
}

export default Select
