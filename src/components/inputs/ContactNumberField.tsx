import { InputAdornment, TextField } from '@mui/material';
import Person from '@mui/icons-material/Person';

const ContactNumberField = ({
  formik,
  name,
  label,
  placeholder,
  ...props
}: {
  formik: any;
  name?: string;
  label?: string;
  placeholder?: string;
}) => {
  return (
    <TextField
      type='tel'
      fullWidth
      label={label}
      name={name}
      placeholder={placeholder}
      margin='normal'
      slotProps={{
        input: {
          inputMode: 'numeric', // mobile numeric keypad
          startAdornment: (
            <InputAdornment position='start'>
              <Person />
            </InputAdornment>
          ),
        },
      }}
      value={formik.values[name] || ''}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
          formik.setFieldValue(name, value);
        }
      }}
      // onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      {...props}
    />
  );
};

export default ContactNumberField;
