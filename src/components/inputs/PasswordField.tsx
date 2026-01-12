import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Person, Visibility, VisibilityOff } from '@mui/icons-material';
import Password from '@mui/icons-material/Password';

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
    <TextField
      type={showPassword ? 'text' : 'password'}
      fullWidth
      label={label}
      name={name}
      placeholder={placeholder}
      margin='normal'
      value={formik.values[name] || ''}
      onChange={formik.handleChange}
      // onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      slotProps={{
        input: {
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
          startAdornment: (
            <InputAdornment position='start'>
              <Password />
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default PasswordField;
