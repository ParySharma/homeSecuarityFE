import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid';
import _map from 'lodash/map';
import React from 'react';

const DashCards = ({ countMap }: { countMap: any }) => {
  const formatLabel = (key: string) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  return (
    <Grid2 container spacing={2}>
      {_map(countMap, (item, key) => (
        <Grid2 key={key} size={{ xs: 6, sm: 3 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 4,
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              background: item?.gradient,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              transition: 'all 0.35s ease',
              '&:hover': {
                transform: 'translateY(-6px) scale(1.02)',
                boxShadow: '0 14px 32px rgba(0,0,0,0.25)',
              },
            }}
          >
            {/* Decorative background circle */}
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
              }}
            />

            {/* Background Icon */}
            <Box
              sx={{
                opacity: 0.15,
                position: 'absolute',
                right: 10,
                top: 10,
                svg: { fontSize: 62 },
              }}
            >
              {item?.icon}
            </Box>

            {/* Foreground Icon */}
            <Box
              sx={{
                mb: 1,
                opacity: 0.6,
                display: { xs: 'none', md: 'block' },
                svg: { fontSize: 36 },
              }}
            >
              {item?.icon}
            </Box>

            {/* Count */}
            <Typography variant='h3' sx={{ fontWeight: 800 }}>
              {item?.value}
            </Typography>

            {/* Label */}
            <Typography
              variant='body1'
              sx={{ mt: 0.5, opacity: 0.9, fontWeight: 500 }}
            >
              {formatLabel(key)}
            </Typography>
          </Box>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default DashCards;
