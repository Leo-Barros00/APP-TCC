import 'styled-components';

type Variant = 'primary' | 'secondary' | 'error' | 'warning' | 'success'

interface Pallete {
  main: string,
  constrastText: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Record<Variant, Pallete>
  }
}