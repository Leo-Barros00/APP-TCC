import React from 'react'
import { Modal as ReactNativeModal } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'

import { IModal } from './interface'

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.247);
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.ScrollView`
  background-color: #fff;
  width: 90%;
  max-height: 50%;
  padding: 16px;
  border-radius: 16px;
`

const ModalHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

const ModalTitle = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 24px;
  margin-bottom: 8px;
`

const ModalCloseIcon = styled.TouchableHighlight`
  display: flex;
  height: 24px;
  width: 24px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`

const Modal: React.FC<IModal> = ({
  isModalVisible,
  setIsModalVisible,
  title,
  children,
}) => {
  function closeModal() {
    setIsModalVisible(false)
  }

  return (
    <ReactNativeModal
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <ModalOverlay>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <ModalCloseIcon onPress={closeModal} underlayColor={'#0000004c'}>
              <FontAwesome name="close" size={16} color="black" />
            </ModalCloseIcon>
          </ModalHeader>
          {children}
        </ModalContainer>
      </ModalOverlay>
    </ReactNativeModal>
  )
}

export default Modal
