import { InputAdornment } from '@mui/material';
import Person from '@mui/icons-material/Person';
import { StyledTextField } from '../componentStyles';

interface ContactNumberFieldProps {
  formik: any;
  name: string;
  label?: string;
  placeholder?: string;
  inputTextColor?: string;
}

const ContactNumberField = ({
  formik,
  name,
  label,
  placeholder,
  inputTextColor,
  ...props
}: ContactNumberFieldProps) => {
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
      value={formik.values?.[name] ?? ''}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
          formik.setFieldValue(name, value);
        }
      }}
      error={Boolean(formik.touched?.[name] && formik.errors?.[name])}
      helperText={formik.touched?.[name] && formik.errors?.[name]}
      inputTextColor={inputTextColor}
      {...props}
    />
  );
};

export default ContactNumberField;
