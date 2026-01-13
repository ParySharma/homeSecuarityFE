import { InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Person from '@mui/icons-material/Person';

/* Styled TextField */
const StyledTextField = styled(TextField)`
  /* Input root */
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

  /* Icon */
  .MuiInputAdornment-root svg {
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

const ContactNumberField = ({
  formik,
  name,
  label,
  placeholder,
  ...props
}: {
  formik: any;
  name?: any;
  label?: string;
  placeholder?: string;
}) => {
  return (
    <StyledTextField
      type='tel'
      fullWidth
      label={label}
      name={name}
      placeholder={placeholder}
      margin='normal'
      slotProps={{
        input: {
          inputMode: 'numeric',
          startAdornment: (
            <InputAdornment position='start'>
              <Person />
            </InputAdornment>
          ),
        },
      }}
      value={formik.values?.[name] || ''}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
          formik.setFieldValue(name, value);
        }
      }}
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
      helperText={formik.touched?.[name] && formik.errors?.[name]}
      {...props}
    />
  );
};

export default ContactNumberField;
