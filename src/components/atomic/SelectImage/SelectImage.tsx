import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

import { ISelectImage } from './interface'
import TextButton from '../TextButton'

const askForCameraPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA)
  return status
}

const SelectImage: React.FC<ISelectImage> = ({ callback }) => {
  async function pickImageFromCamera() {
    const permissionStatus = await askForCameraPermission()
    if (permissionStatus !== 'granted') {
      alert('Você precisa conceder permissão para usar a câmera!')
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      callback(result.assets[0].uri)
    }
  }

  async function pickImageFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      callback(result.assets[0].uri)
    }
  }

  return (
    <>
      <TextButton
        variant="primary"
        text="Selecionar da galeria"
        onPress={pickImageFromGallery}
      />
      <TextButton
        variant="primary"
        text="Utilizar Câmera"
        onPress={pickImageFromCamera}
      />
    </>
  )
}

export default SelectImage
