import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Password from '@mui/icons-material/Password';
import { StyledTextField } from '../componentStyles';

const PasswordField = ({
  formik,
  name = 'password',
  label = 'Password',
  placeholder = 'Enter password',
  inputTextColor,
  ...props
}: {
  formik: any;
  name?: string;
  label?: string;
  placeholder?: string;
  inputTextColor?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledTextField
      type={showPassword ? 'text' : 'password'}
      fullWidth
      label={label}
      name={name}
      placeholder={placeholder}
      inputTextColor={inputTextColor}
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
