import React from 'react';
import { TextField, MenuItem, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

type OptionType = {
  label: string;
  value: string | number;
};

type Props = {
  formik: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  select?: boolean;
  options?: OptionType[];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
};

const StyledTextField = styled(TextField)`
  /* Root */
  .MuiOutlinedInput-root {
    // background-color: var(--body-background-color);
    color: var(--body-text-color);

    fieldset {
      border-color: var(--primary-button-back-opacity);
    }

    &:hover fieldset {
      border-color: var(--primary-button-background-color);
    }

    &.Mui-focused fieldset {
      border-color: var(--primary-button-background-color);
      border-width: 0.125rem;
    }
  }

  /* Label */
  .MuiInputLabel-root {
    color: var(--body-text-color);
  }

  .MuiInputLabel-root.Mui-focused {
    color: var(--primary-button-background-color);
  }

  /* Helper text */
  .MuiFormHelperText-root {
    color: var(--body-text-color);
  }

  .MuiFormHelperText-root.Mui-error {
    color: #d32f2f;
  }

  /* Icons */
  .MuiInputAdornment-root svg {
    color: var(--primary-button-background-color);
  }

  /* Textarea specific */
  .MuiOutlinedInput-root textarea {
    line-height: 1.6;
    resize: vertical;
  }
`;

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
  ...props
}: Props) => {
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
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
      helperText={formik.touched?.[name] && formik.errors?.[name]}
      slotProps={{
        input: {
          startAdornment: startIcon ? (
            <InputAdornment position='start'>{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position='end'>{endIcon}</InputAdornment>
          ) : undefined,
        },
      }}
      {...props}
    >
      {select &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </StyledTextField>
  );
};

export default CommonInputField;
