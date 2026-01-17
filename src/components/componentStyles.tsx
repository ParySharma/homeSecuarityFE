import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

interface StyledTextFieldProps {
  inputTextColor?: string;
}

export const StyledTextField = styled(TextField)<StyledTextFieldProps>(
  ({ inputTextColor }) => ({
    /* Input root */
    '& .MuiOutlinedInput-root': {
      color: inputTextColor || 'var(--body-text-color)',

      '& fieldset': {
        borderColor: 'var(--primary-button-back-opacity)',
      },

      '&:hover fieldset': {
        borderColor: 'var(--primary-button-background-color)',
      },

      '&.Mui-focused fieldset': {
        borderColor: 'var(--primary-button-background-color)',
        borderWidth: 2,
      },
    },

    /* Label */
    '& .MuiInputLabel-root': {
      color: 'var(--card-background-color)',
    },

    '& .MuiInputLabel-root.Mui-focused': {
      color: 'var(--primary-button-background-color)',
    },

    /* Icon */
    '& .MuiInputAdornment-root svg': {
      color: 'var(--primary-button-background-color)',
    },

    /* Helper text */
    '& .MuiFormHelperText-root': {
      color: 'var(--body-text-color)',
    },

    '& .MuiFormHelperText-root.Mui-error': {
      color: '#d32f2f',
    },
  })
);
