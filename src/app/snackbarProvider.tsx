'use client';

// Libraries
import { useRef } from 'react';
import { SnackbarProvider } from 'notistack';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { NULL } from '@/utils/constants';

// Utils

function Snackbar({ children }: { children: React.ReactNode }) {
  const notistackRef: any = useRef(NULL);

  const onClose = (key: any) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  const action = (key: any) => (
    <IconButton
      size='small'
      aria-label='close'
      color='inherit'
      onClick={onClose(key)}
    >
      <CloseIcon fontSize='small' />
    </IconButton>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={1}
        preventDuplicate
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ marginTop: '89px' }}
        action={action}
      >
        {children}
      </SnackbarProvider>
    </LocalizationProvider>
  );
}

export default Snackbar;
