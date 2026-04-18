import { useMemo, ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import palette from './palette';
import typography from './typography';
import breakpoints from './breakPoints';

type Props = {
  children: ReactNode;
};

export default function ThemeConfig({ children }: Props) {

  const theme = useMemo(
    () =>
      createTheme({
        palette,
        typography,
        breakpoints,
      }),
    []
  );
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}