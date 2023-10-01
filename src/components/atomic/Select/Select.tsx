import React, { useState } from 'react'
import { View } from 'react-native'

import TextButton from '@Components/atomic/TextButton'
import Modal from '@Components/atomic/Modal'

import { ISelect } from './interface'

const Select: React.FC<ISelect> = ({
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
      <TextButton
        text={selectedOptionObject ? selectedOptionObject.value : title}
        variant="primary"
        onPress={handleOnPressSelectButton}
        disabled={disabled}
        ghost={!!selectedOptionObject}
      />
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
