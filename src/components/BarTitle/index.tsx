import { Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { string } from 'yup';

const BarTitle = ({
  color = 'grey',
  title,
  textStyle,
  deviderStyle,
  containerStyle,
}: {
  color?: string;
  title: string;
  textStyle?: React.CSSProperties;
  deviderStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}) => {
  return (
    <div>
      <Stack
        direction={'row'}
        spacing={2}
        mt={{ xs: 3, md: 4 }}
        mb={1}
        style={containerStyle}
      >
        <Divider
          orientation='vertical'
          variant='middle'
          flexItem
          sx={{
            deviderStyle,
            borderWidth: 3,
            borderRadius: 8,
            borderColor: color,
          }}
        />
        <Typography
          variant='h6'
          sx={{ mb: 2, mt: 4, fontWeight: 600 }}
          style={textStyle}
        >
          {title}
        </Typography>
      </Stack>
    </div>
  );
};

export default BarTitle;
