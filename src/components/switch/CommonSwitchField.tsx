import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = {
  formik: any;
  name: string;
  label?: string;
  disabled?: boolean;
};

const StyledSwitch = styled(Switch)`
  width: 2.75rem;
  height: 1.5rem;
  padding: 0;

  .MuiSwitch-switchBase {
    padding: 0.125rem;
    color: #fff;

    &.Mui-checked {
      transform: translateX(1.25rem);
      color: #fff;

      + .MuiSwitch-track {
        background-color: var(--primary-button-background-color);
        opacity: 1;
      }
    }
  }

  .MuiSwitch-thumb {
    width: 1.25rem;
    height: 1.25rem;
    background-color: var(--primary-button-text-color);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  }

  .MuiSwitch-track {
    border-radius: 1rem;
    background-color: var(--primary-button-back-opacity);
    opacity: 1;
  }

  &.Mui-disabled {
    .MuiSwitch-track {
      background-color: var(--field-disabled-text-color);
    }
  }
`;

const CommonSwitchField = ({
  formik,
  name,
  label,
  disabled = false,
}: Props) => {
  return (
    <FormControlLabel
      label={label}
      sx={{
        color: 'var(--body-text-color)',
        marginLeft: 0,
        gap: 1.2,
      }}
      control={
        <StyledSwitch
          checked={Boolean(formik.values?.[name])}
          onChange={(e) => {
            formik.setFieldValue(name, e.target.checked);
          }}
          onBlur={() => formik.setFieldTouched(name, true)}
          disabled={disabled}
        />
      }
    />
  );
};

export default CommonSwitchField;
