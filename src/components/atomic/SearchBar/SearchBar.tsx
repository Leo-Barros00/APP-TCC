import React, { useState } from 'react'
import { TextInput } from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

const Container = styled.View`
  width: 100%;
  min-height: 30px;
  border-radius: 36px;
  padding: 12px 16px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  border-width: 2px;
  border-color: gray;
`

const SearchBar: React.FC<ISearchBar> = ({ placeholder, onChange, onPress }) => {
  const [searchText, setSearchText] = useState('')

  return (
    <Container>
      <TextInput
        placeholder={placeholder}
        value={searchText}
        onChangeText={onChange}
        onPressIn={onPress}
        style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, flex: 1 }}
      />
      <MaterialIcons name={'search'} size={20} color={'black'} />
    </Container>
  )
}

export default SearchBar
