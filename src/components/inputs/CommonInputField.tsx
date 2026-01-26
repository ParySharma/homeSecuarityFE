import React from 'react';
import { TextField, MenuItem, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledTextField } from '../componentStyles';
import _map from 'lodash/map';
import _size from 'lodash/size';
import _isEmpty from 'lodash/isEmpty';

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
  onDropdownOpen?: () => void;
  loading?: boolean;
  obJectKeys?: string | null;
  onSelectChange?: (value: any) => void;
  valueKey?: string | null;
  loadingAsset?: React.ReactNode;
  noOptionAsset?: React.ReactNode;
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
  onDropdownOpen,
  loading = false,
  obJectKeys,
  onSelectChange,
  valueKey,
  loadingAsset,
  noOptionAsset,
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

  const handleOpen = () => {
    (async () => {
      if (onDropdownOpen && _size(options) === 0) {
        onDropdownOpen();
      }
    })();
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
      // SelectProps={select ? { onOpen: handleOpen } : undefined}
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
        select: {
          onOpen: select ? handleOpen : undefined,
        },
      }}
      {...props}
    >
      {select && loading ? (
        <MenuItem disabled>{loadingAsset || 'Loading...'}</MenuItem>
      ) : _isEmpty(options) ? (
        <MenuItem disabled>{noOptionAsset || 'No options available'}</MenuItem>
      ) : (
        _map(options, (option: any) => {
          return (
            <MenuItem
              key={option?.[valueKey || 'value'] || option?._id}
              value={option?.[valueKey || 'value'] || option?._id}
              disabled={
                option?.[valueKey || 'value'] === '' || option?._id === ''
              }
              onClick={() => {
                onSelectChange && onSelectChange(option);
              }}
            >
              {option?.[obJectKeys || 'label']}
            </MenuItem>
          );
        })
      )}
    </StyledTextField>
  );
};

export default CommonInputField;
