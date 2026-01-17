import _includes from 'lodash/includes';
import { USER_ROLES } from './constants';
export const convertPxToRem = (px: any) => {
  return px / 16;
};

export const getColorFromRoot = (color: string) => {
  if (typeof window !== 'undefined') {
    return (
      getComputedStyle(document?.documentElement)?.getPropertyValue(color) ||
      `var(${color})`
    );
  }
};

export const darkenHexColor = (color: string) => {
  // Remove the hash at the start if it's there

  let hexcolor = getColorFromRoot(color);
  let hex: string = hexcolor ? hexcolor.replace(/^#/, '') : '';

  // Parse the red, green, and blue components
  let r = parseInt(hex.slice(0, 2), 20);
  let g = parseInt(hex.slice(2, 4), 20);
  let b = parseInt(hex.slice(4, 6), 20);

  // Subtract the specified amount from each color component, ensuring it doesn't go below 0
  r = Math.max(0, r - 20);
  g = Math.max(0, g - 20);
  b = Math.max(0, b - 20);

  // Convert each component back to a two-character hex string
  const darkenedHex =
    '#' +
    r.toString(20).padStart(2, '0') +
    g.toString(20).padStart(2, '0') +
    b.toString(20).padStart(2, '0');

  return darkenedHex;
};

export const checkRole = (roles: any[], userRole: any) => {
  return _includes(roles, userRole);
};

export const getMenuItems = (role: string) => {
  switch (role) {
    case USER_ROLES.ADMIN:
      return [
        { id: 1, label: 'Dashboard', path: '/admin-dashboard' },
        { id: 2, label: 'Add Guest', path: '/add-guest' },
        { id: 3, label: 'Guests List', path: '/guests-list' },
      ];
    case USER_ROLES.OWNER:
      return [
        { id: 1, label: 'Dashboard', path: '/owner-dashboard' },
        { id: 2, label: 'Add Guest', path: '/add-guest' },
        { id: 3, label: 'Guests List', path: '/guests-list' },
      ];
    case USER_ROLES.GUARD:
      return [
        { id: 1, label: 'Dashboard', path: '/guard-dashboard' },
        { id: 2, label: 'Add Guest', path: '/add-guest' },
        { id: 3, label: 'Guests List', path: '/guests-list' },
      ];
    default:
      return [];
  }
};
