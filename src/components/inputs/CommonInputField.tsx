import React from 'react';
import { TextField, MenuItem, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledTextField } from '../componentStyles';
import _map from 'lodash/map';
import _size from 'lodash/size';

type OptionType = {
  label: string;
  value: string | number;
};

type Props = {
  formik: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: any;
  select?: boolean;
  options?: OptionType[];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  inputTextColor?: string;
  maxDigits?: number;
  endIconClick?: () => void;
  endIconStyle?: React.CSSProperties;
};

const CommonInputField = ({
  formik,
  name,
  label,
  placeholder,
  type = 'text',
  select = false,
  options = [],
  startIcon,
  endIcon,
  multiline = false,
  rows = 3,
  disabled = false,
  inputTextColor,
  maxDigits,
  endIconClick,
  endIconStyle,
  ...props
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Numeric fields only
    if (type === 'number' || type === 'tel') {
      // Remove everything except digits
      value = value.replace(/[^0-9]/g, '');

      // Stop negative values explicitly
      if (
        value.startsWith('-') ||
        value === '-' ||
        value === '+' ||
        value === '0'
      ) {
        return;
      }

      // Apply digit limit
      if (maxDigits && value.length > maxDigits) {
        return;
      }
    }

    formik.setFieldValue(name, value);
  };

  return (
    <StyledTextField
      fullWidth
      margin='normal'
      name={name}
      label={label}
      placeholder={placeholder}
      type={select ? undefined : type}
      select={select}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      disabled={disabled}
      value={formik.values?.[name] ?? ''}
      onChange={handleChange}
      onBlur={formik.handleBlur}
      error={Boolean(formik.touched?.[name] && formik.errors?.[name])}
      helperText={formik.touched?.[name] && formik.errors?.[name]}
      slotProps={{
        input: {
          inputMode: type === 'number' || type === 'tel' ? 'numeric' : 'text',
          startAdornment: startIcon ? (
            <InputAdornment position='start'>{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment
              position='end'
              onClick={endIconClick}
              style={{
                ...endIconStyle,
                marginRight: select ? '20px' : undefined,
              }}
            >
              {endIcon}
            </InputAdornment>
          ) : undefined,
        },
      }}
      {...props}
    >
      {select &&
        _map(options, (option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.value === ''}
          >
            {option.label}
          </MenuItem>
        ))}
    </StyledTextField>
  );
};

export default CommonInputField;
