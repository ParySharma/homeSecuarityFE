import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';
import {
  convertPxToRem,
  darkenHexColor,
  getColorFromRoot,
} from '@/utils/commonFunction';
import { BUTTON_TYPE } from '@/utils/constants';

const ButtonWrapper: any = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'fontSize' &&
    prop !== 'textColor' &&
    prop !== 'backgroundColor' &&
    prop !== 'borderColor' &&
    prop !== 'marginLeft' &&
    prop !== 'marginTop' &&
    prop !== 'HoverbgColor' &&
    prop !== 'HoverColor' &&
    prop !== 'HoverBorder' &&
    prop !== 'textTransform' &&
    prop !== 'marginBottom',
})`
  &&.MuiButtonBase-root {
    box-shadow: none;
    font-size: ${({ fontSize }: any) => `${convertPxToRem(fontSize || 14)}rem`};

    font-weight: ${({ weight }: any) => weight || 400};

    border-radius: ${({ radius }: any) => `${convertPxToRem(radius || 4)}rem`};

    height: ${({ height }: any) => `${convertPxToRem(height || 42)}rem`};

    min-height: ${({ minheight }: any) =>
      `${convertPxToRem(minheight || 42)}rem`};

    width: ${({ width }: any) =>
      width ? `${convertPxToRem(width)}rem` : 'auto'};

    min-width: ${({ minwidth, width }: any) =>
      minwidth
        ? `${convertPxToRem(minwidth)}rem`
        : width
        ? `${convertPxToRem(width)}rem`
        : 'auto'};

    margin-top: ${({ mt }: any) => `${mt || 0}rem`};
    margin-right: ${({ mr }: any) => `${convertPxToRem(mr || 0)}rem`};
    margin-bottom: ${({ mb }: any) => `${convertPxToRem(mb || 0)}rem`};
    margin-left: ${({ ml }: any) => `${convertPxToRem(ml || 0)}rem`};

    position: ${({ position }: any) => position};
    left: ${({ left }: any) => (left ? `${convertPxToRem(left)}rem` : 'auto')};

    line-height: normal;
    text-transform: ${({ textTransform }: any) =>
      textTransform || 'capitalize'};

    padding: ${({ padding }: any) => padding};

    background: ${({ backgroundColor }: any) =>
      backgroundColor || 'var(--primary-button-background-color)'};

    color: ${({ textColor }: any) =>
      textColor || 'var(--primary-button-text-color)'};

    border: 1px solid
      ${({ borderColor }: any) =>
        borderColor || 'var(--primary-button-background-color)'};

    &:hover {
      background: ${({ HoverbgColor, backgroundColor }: any) =>
        HoverbgColor ||
        backgroundColor ||
        darkenHexColor('--primary-button-background-color')};

      color: ${({ HoverColor, textColor }: any) =>
        HoverColor || textColor || 'var(--primary-button-text-color)'};

      border: 1px solid
        ${({ HoverBorder, borderColor }: any) =>
          HoverBorder ||
          borderColor ||
          'var(--primary-button-background-color)'};
    }

    .MuiButton-startIcon {
      margin-left: 0;
    }
  }

  &&.Mui-disabled {
    background: var(--field-disabled-text-color) !important;
    -webkit-text-fill-color: var(--primary-button-text-color) !important;
    border: 1px solid var(--field-disabled-text-color) !important;
    cursor: not-allowed;
  }

  &&.secondary.MuiButtonBase-root {
    background: ${({ backgroundColor }: any) =>
      backgroundColor || 'var(--secondary-button-background-color)'};

    color: ${({ textColor }: any) =>
      textColor || 'var(--secondary-button-text-color)'};

    border: 1px solid
      ${({ borderColor }: any) =>
        borderColor || 'var(--secondary-button-background-color)'};
  }

  &&.outline-primary.MuiButtonBase-root {
    background: ${({ backgroundColor }: any) =>
      backgroundColor || 'var(--transparent)'};

    color: ${({ textColor }: any) =>
      textColor || 'var(--primary-button-background-color)'};

    border: 1px solid
      ${({ borderColor }: any) =>
        borderColor || 'var(--primary-button-background-color)'};

    &:hover {
      background: ${({ HoverbgColor, backgroundColor }: any) =>
        HoverbgColor ||
        backgroundColor ||
        `${getColorFromRoot('--primary-button-background-color')}1A`};
    }
  }

  &&.block-button {
    width: 100%;
  }
`;

const ButtonStyled = ({ loading, text, onClick, ...props }: any) => {
  const buttonRef = useRef<any>(null);

  return (
    <ButtonWrapper
      {...props}
      ref={buttonRef}
      type={loading ? BUTTON_TYPE.BUTTON : props.type}
      onClick={(e: any) => (!loading && onClick ? onClick(e) : undefined)}
    >
      {loading ? (
        <CircularProgress size={`${convertPxToRem(20)}rem`} color='inherit' />
      ) : (
        text
      )}
    </ButtonWrapper>
  );
};

export default ButtonStyled;
