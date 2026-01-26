import React, { ReactNode } from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import BarTitle from '../BarTitle';

type CardComponentProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  elevation?: number;
  padding?: number | string;
  radius?: number | string;
  headerAction?: ReactNode;
  barColor?: string;
  sx?: any;
};

const CardComponent = ({
  title,
  subtitle,
  children,
  footer,
  elevation = 3,
  padding = 2,
  radius = 2,
  headerAction,
  barColor,
  sx,
}: CardComponentProps) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        p: padding,
        borderRadius: radius,
        backgroundColor: '#fff',
        ...sx,
      }}
    >
      {(title || headerAction) && (
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={1}
        >
          <Box>
            {title && (
              <BarTitle
                title={title}
                color={barColor || 'var(--primary-button-background-color)'}
                containerStyle={{ marginTop: '0px' }}
              />
            )}
            {subtitle && (
              <Typography variant='body2' color='text.secondary'>
                {subtitle}
              </Typography>
            )}
          </Box>

          {headerAction && <Box>{headerAction}</Box>}
        </Box>
      )}

      {(title || subtitle) && <Divider sx={{ mb: 2 }} />}

      {/* Content */}
      <Box>{children}</Box>

      {/* Footer */}
      {footer && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box>{footer}</Box>
        </>
      )}
    </Paper>
  );
};

export default CardComponent;
