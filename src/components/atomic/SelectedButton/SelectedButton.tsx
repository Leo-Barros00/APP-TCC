import React, { useState } from 'react'
import { ISelectButton } from './interface'
import TextButton from '../TextButton'

const SelectedButton: React.FC<ISelectButton> = ({ text, onClick }) => {
  const [isSelected, setIsSelected] = useState(true)

  return (
    <TextButton
      text={text}
      variant="primary"
      ghost={isSelected}
      fluid
      onPress={() => {
        setIsSelected(!isSelected)
        onClick()
      }}
    />
  )
}

export default SelectedButton
