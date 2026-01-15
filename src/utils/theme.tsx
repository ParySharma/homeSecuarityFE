import Cookies from 'js-cookie';

import { dispatch } from '@/redux/store';
import { setThemeToggle } from '@/redux/slices/commonSlice';
import { THEME } from './constants';

export const setThemeCookies = (theme: any) => {
  Cookies.set('theme', theme, {
    domain: process.env.NEXT_PUBLIC_ZOMO_HEALTH_DOMAIN,
  });
};

export const setTheme = (theme: any, saveCookie: boolean = true) => {
  if (saveCookie) {
    setThemeCookies(theme);
  }
  dispatch(setThemeToggle(theme));
  document.querySelector('html')?.setAttribute('data-theme', theme);
  // set meta theme color as per theme
  const setmeta = setInterval(() => {
    const themeColor = getComputedStyle(document.body).getPropertyValue(
      '--body-background-color'
    );
    const metaThemeColor = document.getElementById('theme_color');
    // Lets add null check to avoid error
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
      clearInterval(setmeta);
    }
  }, 1000);
};

export const keepSystemDefaultTheme = (themeSettings: any) => {
  const themeCookies = Cookies.get('theme');
  if (themeSettings?.enable_theme_mode === 0) {
    return setTheme(THEME.LIGHT);
  }
  if (themeCookies) {
    return setTheme(themeCookies);
  } else {
    return setTheme(THEME.LIGHT);
  }
};

export const setThemeVariables = (themeSettings: any) => {
  const root = document.documentElement;
  if (root) {
    if (themeSettings?.theme_color) {
      root.style.setProperty('--theme-color', themeSettings?.theme_color);
      root.style.setProperty(
        '--theme-opacity-20',
        `${themeSettings?.theme_color}33`
      );
      root.style.setProperty(
        '--theme-opacity-10',
        `${themeSettings?.theme_color}1a`
      );
      root.style.setProperty(
        '--theme-opacity-4',
        `${themeSettings?.theme_color}0a`
      );
    }
    if (themeSettings?.button_color) {
      root.style.setProperty(
        '--primary-button-background-color',
        themeSettings?.button_color
      );
      root.style.setProperty(
        '--primary-button-back-opacity',
        `${themeSettings?.button_color}33`
      );
    }
    if (themeSettings?.progress_color) {
      root.style.setProperty(
        '--progress-bar-color',
        themeSettings?.progress_color
      );
      root.style.setProperty(
        '--progress-bar-back-opacity',
        `${themeSettings?.progress_color}1a`
      );
    }
    if (themeSettings?.link_color) {
      root.style.setProperty('--link-color', themeSettings?.link_color);
    }
    if (themeSettings?.header_color) {
      root.style.setProperty('--heading-color', themeSettings?.header_color);
      root.style.setProperty(
        '--heading-opacity',
        `${themeSettings?.header_color}33`
      );
    }
    if (themeSettings?.icons_color) {
      root.style.setProperty('--icon-color', themeSettings?.icons_color);
      root.style.setProperty(
        '--action-background-color',
        `${themeSettings?.icons_color}1a`
      );
      root.style.setProperty(
        '--icon-opacity',
        `${themeSettings?.icons_color}33`
      );
    }
    if (themeSettings?.progress_hra_low_color) {
      root.style.setProperty(
        '--progress_hra_low_color',
        themeSettings?.progress_hra_low_color
      );
    }
    if (themeSettings?.progress_hra_mod_color) {
      root.style.setProperty(
        '--progress_hra_mod_color',
        themeSettings?.progress_hra_mod_color
      );
    }
    if (themeSettings?.progress_hra_high_color) {
      root.style.setProperty(
        '--progress_hra_high_color',
        themeSettings?.progress_hra_high_color
      );
    }
    if (themeSettings?.progress_hra_very_high_color) {
      root.style.setProperty(
        '--progress_hra_very_high_color',
        themeSettings?.progress_hra_very_high_color
      );
    }
    if (themeSettings?.progress_very_high_color) {
      root.style.setProperty(
        '--progress_very_high_color',
        themeSettings?.progress_very_high_color
      );
    }
    if (themeSettings?.table_color || themeSettings?.theme_color) {
      root.style.setProperty(
        '--table-background-color',
        `${themeSettings?.table_color || themeSettings?.theme_color}0a`
      );
    }
  }
};

export const removeThemeVariables = () => {
  const root = document.documentElement;
  if (root) {
    root.style.removeProperty('--theme-color');
    root.style.removeProperty('--theme-opacity-20');
    root.style.removeProperty('--theme-opacity-10');
    root.style.removeProperty('--theme-opacity-4');
    root.style.removeProperty('--primary-button-background-color');
    root.style.removeProperty('--primary-button-back-opacity');
    root.style.removeProperty('--progress-bar-color');
    root.style.removeProperty('--progress-bar-back-opacity');
    root.style.removeProperty('--link-color');
    root.style.removeProperty('--heading-color');
    root.style.removeProperty('--heading-opacity');
    root.style.removeProperty('--icon-color');
    root.style.removeProperty('--action-background-color');
    root.style.removeProperty('--icon-opacity');
    root.style.removeProperty('--progress_hra_low_color');
    root.style.removeProperty('--progress_hra_mod_color');
    root.style.removeProperty('--progress_hra_high_color');
    root.style.removeProperty('--progress_hra_very_high_color');
    root.style.removeProperty('--progress_very_high_color');
    root.style.removeProperty('--table-background-color');
  }
};
