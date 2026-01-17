import { Box, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useRouter } from 'next/navigation';
const QuickAddButton = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title='Quick add guest'>
        <IconButton
          onClick={() => router.push('/add-guest')}
          size='small'
          sx={{
            color: 'var(--header-text-color)',
            backgroundColor: 'var(--primary-button-back-opacity)',
            '&:hover': {
              backgroundColor: 'var(--primary-button-back-opacity)',
            },
            width: 35,
            height: 35,
          }}
        >
          <PersonAddAlt1Icon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default QuickAddButton;
