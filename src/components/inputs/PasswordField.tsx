import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Password from '@mui/icons-material/Password';

/* Styled TextField */
const StyledTextField = styled(TextField)`
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
      border-width: 2px;
    }
  }

  /* Label */
  .MuiInputLabel-root {
    color: var(--body-text-color);
  }

  .MuiInputLabel-root.Mui-focused {
    color: var(--primary-button-background-color);
  }

  /* Icons */
  .MuiInputAdornment-root svg {
    color: var(--primary-button-background-color);
  }

  .MuiIconButton-root {
    color: var(--primary-button-background-color);
  }

  /* Helper text */
  .MuiFormHelperText-root {
    color: var(--body-text-color);
  }

  .MuiFormHelperText-root.Mui-error {
    color: #d32f2f;
  }
`;

const PasswordField = ({
  formik,
  name = 'password',
  label = 'Password',
  placeholder = 'Enter password',
  ...props
}: {
  formik: any;
  name?: string;
  label?: string;
  placeholder?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledTextField
      type={showPassword ? 'text' : 'password'}
      fullWidth
      label={label}
      name={name}
      placeholder={placeholder}
      margin='normal'
      value={formik.values[name] || ''}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <Password />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                edge='end'
                onClick={() => setShowPassword((prev) => !prev)}
                onMouseDown={(e) => e.preventDefault()}
                aria-label='toggle password visibility'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default PasswordField;
