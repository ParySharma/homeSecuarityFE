'use client';

import { CSSProperties, ReactNode, useEffect, useMemo } from 'react';
import {
  keepSystemDefaultTheme,
  removeThemeVariables,
  setTheme,
  setThemeVariables,
} from '@/utils/theme';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector, RootState } from '@/redux/store';
import _isEmpty from 'lodash/isEmpty';
import useAuth from '@/contexts/useAuth';
import { THEME } from '@/utils/constants';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    caption1: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    caption1?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    caption1: true;
  }
}

const palette: any = {
  light: {
    mode: 'light',
    background: {
      default: 'var(--body-background-color)',
    },
  },
  dark: {
    mode: 'dark',
    background: {
      default: 'var(--body-background-color)',
    },
  },
};

const ThemeProviders = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { user } = useAuth();
  const { theme, championSettings } = useSelector(
    (state: RootState) => state.commonSlice
  );
  const { themeSettingsLoading, themeSettings, themeSettingsError } =
    useSelector((state: RootState) => state.themeSettings);

  const themes = useMemo(() => {
    return createTheme({
      palette: theme === THEME.LIGHT ? palette.light : palette.dark,
      typography: {
        allVariants: {
          wordBreak: 'break-word',
        },
        fontFamily: 'inherit',
        fontSize: 16, // Base font size
        htmlFontSize: 16, // Base font size for the <html> element
        h1: {
          fontSize: '1.5rem', // 18px - 24px
        },
        h2: {
          fontSize: '1.375rem', // 16px - 22px
        },
        h3: {
          fontSize: '1.25rem', // 14px - 20px
        },
        h4: {
          fontSize: '1.125rem', // 12px - 18px
        },
        subtitle1: {
          fontSize: '1rem', // 10px - 16px
        },
        body1: {
          fontSize: '1rem', // 10px - 16px
        },
        body2: {
          fontSize: '1.125rem', // 12px - 18px
        },
        caption: {
          fontSize: '0.875rem', // 14px
        },
        caption1: {
          fontSize: '0.875rem', // 14px span tag
        },
        button: {
          fontSize: '1rem', // 10px - 16px
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            p: {
              margin: 0,
              padding: 0,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              caption: 'p',
              caption1: 'span',
            },
          },
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 640,
          md: 900,
          lg: 1200,
          xl: 1600,
        },
      },
    });
  }, [theme]);

  useEffect(() => {
    if (theme === THEME.LIGHT) {
      if (themeSettings && !themeSettingsLoading && !themeSettingsError) {
        setThemeVariables(championSettings?.theme_setting || themeSettings);
      }
    } else {
      if (user?.userHaveChampion === 1) {
        if (championSettings?.theme_setting?.enable_theme_mode === 0) {
          setTheme(THEME.LIGHT);
        }
      } else {
        if (themeSettings?.enable_theme_mode === 0) {
          setTheme(THEME.LIGHT);
        }
      }
      removeThemeVariables();
    }
  }, [
    themeSettings,
    themeSettingsLoading,
    themeSettingsError,
    theme,
    championSettings,
  ]);

  useEffect(() => {
    if (user) {
      keepSystemDefaultTheme(championSettings?.theme_setting || themeSettings);
    }
  }, [user]);

  return (
    <ThemeProvider theme={themes}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviders;
