import 'styled-components';

export type Variant = 'primary' | 'secondary' | 'error' | 'warning' | 'success'

interface ColorPallete {
  main: string,
  constrastText: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Record<Variant, ColorPallete>
  }
}