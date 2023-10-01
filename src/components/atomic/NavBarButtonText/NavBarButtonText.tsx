import React from 'react'
import styled, { css } from 'styled-components/native'

import { INavBarButtonText } from './interface'

const Text = styled.Text<Omit<INavBarButtonText, 'text'>>`
  text-align: center;
  ${({ isRouteSelected, theme }) =>
    isRouteSelected &&
    css`
      font-weight: bold;
      color: ${theme.colors.primary.main};
    `}
`

const NavBarButtonText: React.FC<INavBarButtonText> = ({ text, ...props }) => {
  return <Text {...props}>{text}</Text>
}

export default NavBarButtonText
