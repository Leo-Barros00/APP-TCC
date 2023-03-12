import 'styled-components';

type ColorTheme = 'primary' | 'secondary' | 'error' | 'warning' | 'success'

interface Pallete {
  main: string,
  constrastText: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Record<ColorTheme, Pallete>
  }
}