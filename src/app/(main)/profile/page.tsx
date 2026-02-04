'use client';

import React from 'react';
import { Box, Typography, Divider, Chip, Paper, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import CardComponent from '@/components/Card';
import useAuth from '@/contexts/useAuth';

const MotionPaper = motion(Paper);

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const Profile = () => {
  const { user } = useAuth();

  const guard = user?.user_meta;
  const society = user?.assigned_Societie;

  return (
    <Box>
      <CardComponent title='Profile' sx={{ minHeight: 'calc(100dvh - 150px)' }}>
        <Grid container spacing={4}>
          {/* LEFT PROFILE RAIL */}
          <Grid size={{ xs: 12, md: 4 }}>
            <MotionPaper
              variants={fade}
              initial='hidden'
              animate='visible'
              transition={{ duration: 0.35 }}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                position: { md: 'sticky' },
                top: 90,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(245,247,250,0.9))',
                backdropFilter: 'blur(6px)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box display='flex' flexDirection='column' alignItems='center'>
                <Avatar
                  src='/images/guard-avatar.png'
                  sx={{ width: 96, height: 96, mb: 2 }}
                />

                <Typography variant='h6' fontWeight={700}>
                  {guard?.name}
                </Typography>

                <Typography color='text.secondary' mb={1}>
                  {guard?.role}
                </Typography>

                <Chip label='On Duty' color='success' />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant='body2' color='text.secondary'>
                Contact
              </Typography>

              <Typography fontWeight={600}>{guard?.mobile}</Typography>
            </MotionPaper>
          </Grid>

          {/* RIGHT CONTENT FLOW */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={3}>
              {/* Guard Info */}
              <Grid size={{ xs: 12 }}>
                <MotionPaper
                  variants={fade}
                  initial='hidden'
                  animate='visible'
                  transition={{ duration: 0.35, delay: 0.05 }}
                  elevation={2}
                  sx={{ p: 3, borderRadius: 3 }}
                >
                  <Typography variant='h6' fontWeight={600}>
                    Your Information
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Typography fontWeight={600}>Name</Typography>
                      <Typography>{guard?.name}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography fontWeight={600}>Role</Typography>
                      <Typography>{guard?.role}</Typography>
                    </Grid>
                  </Grid>
                </MotionPaper>
              </Grid>

              {/* Society Info */}
              {society && (
                <Grid size={{ xs: 12 }}>
                  <MotionPaper
                    variants={fade}
                    initial='hidden'
                    animate='visible'
                    transition={{ duration: 0.35, delay: 0.1 }}
                    elevation={2}
                    sx={{ p: 3, borderRadius: 3 }}
                  >
                    <Typography variant='h6' fontWeight={600}>
                      Assigned Society
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography fontWeight={600}>{society?.name}</Typography>
                    <Typography color='text.secondary'>
                      {society?.address}
                    </Typography>
                    <Typography color='text.secondary'>
                      {society?.city}, {society?.state} – {society?.code}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Typography fontWeight={600}>Wings</Typography>
                        <Typography>{society?.wings_set}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Typography fontWeight={600}>Gates</Typography>
                        <Typography>{society?.numbers_of_gate}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Typography fontWeight={600}>Floors</Typography>
                        <Typography>{society?.numbers_of_floor}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Typography fontWeight={600}>Rooms / Floor</Typography>
                        <Typography>{society?.rooms_per_floor}</Typography>
                      </Grid>
                    </Grid>

                    <Box mt={2}>
                      <Chip
                        label={society?.is_active ? 'Active' : 'Inactive'}
                        color={society?.is_active ? 'primary' : 'default'}
                      />
                    </Box>
                  </MotionPaper>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardComponent>
    </Box>
  );
};

export default Profile;
