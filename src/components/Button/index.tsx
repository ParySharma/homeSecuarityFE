import React from 'react';
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
    // font-size: ${({ fontSize }: any) => fontSize || 14}px;
    font-size: ${({ fontSize }: any) => `${convertPxToRem(fontSize || 14)}rem`};
    font-weight: ${({ weight }: any) => weight || 400};
    border-radius: ${({ radius }: any) => radius || 4}px;
    height: ${({ height }: any) => height || 42}px;
    width: ${({ width }: any) => width || '100px'};
    min-height: ${({ minheight }: any) => minheight || 42}px;
    min-width: ${({ width, minwidth }: any) =>
      minwidth ? minwidth : `${width}px` || '100px'};
    margin-top: ${({ mt }: any) => mt || 0}px;
    margin-right: ${({ mr }: any) => mr || 0}px;
    margin-bottom: ${({ mb }: any) => mb || 0}px;
    margin-left: ${({ ml }: any) => ml || 0}px;
    position: ${({ position }: any) => position};
    left: ${({ left }: any) => left};
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
      margin-left: 0px;
    }
  }
  &&.Mui-disabled {
    background: var(--field-disabled-text-color) !important  ;
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

    &:hover {
      background: ${({ HoverbgColor, backgroundColor }: any) =>
        HoverbgColor ||
        backgroundColor ||
        'var(--secondary-button-background-color)'};
      color: ${({ HoverColor, textColor }: any) =>
        HoverColor || textColor || 'var(--secondary-button-text-color)'};
      border: 1px solid
        ${({ HoverBorder, borderColor }: any) =>
          HoverBorder ||
          borderColor ||
          'var(--primary-button-background-color)'};
    }
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

      color: ${({ HoverColor, textColor }: any) =>
        HoverColor || textColor || 'var(--primary-button-background-color)'};
      border: 1px solid
        ${({ HoverBorder, borderColor }: any) =>
          HoverBorder ||
          borderColor ||
          'var(--primary-button-background-color)'};
    }
  }

  &&.block-button {
    width: 100%;
  }
`;

const ButtonStyled = ({
  HoverbgColor,
  HoverColor,
  HoverBorder,
  type,
  className,
  text,
  height,
  width,
  weight,
  onClick,
  position,
  left,
  marginLeft,
  disabled,
  backgroundColor,
  minwidth,
  borderColor,
  textColor,
  radius,
  loading,
  startIcon,
  endIcon,
  fontSize,
  mt,
  mb,
  mr,
  ml,
  padding,
  id,
  minheight,
  textTransform,
}: any) => {
  return (
    <ButtonWrapper
      HoverbgColor={HoverbgColor}
      HoverColor={HoverColor}
      HoverBorder={HoverBorder}
      type={loading ? BUTTON_TYPE.BUTTON : type}
      className={className}
      height={height}
      minheight={minheight}
      width={width}
      minwidth={minwidth}
      id={id}
      weight={weight}
      left={left}
      position={position}
      onClick={(event: any) => (!loading && onClick ? onClick(event) : {})}
      fontSize={fontSize}
      marginLeft={marginLeft}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      disabled={disabled}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      textColor={textColor}
      radius={radius}
      startIcon={startIcon}
      endIcon={endIcon}
      padding={padding}
      textTransform={textTransform}
      // disableRipple
    >
      {loading ? <CircularProgress size={20} color='inherit' /> : text}
    </ButtonWrapper>
  );
};

export default ButtonStyled;
