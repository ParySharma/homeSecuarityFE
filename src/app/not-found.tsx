'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

const Wrapper = styled(Box)`
  height: 100vh;
  width: 100%;
  background-color: #f5f6fa;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Content = styled(Box)`
  padding: 32px;
`;

export default function NotFound() {
  const router = useRouter();

  return (
    <Wrapper>
      <Content>
        <Typography variant='h1' fontWeight={700}>
          404
        </Typography>

        <Typography variant='h6' sx={{ mt: 1, mb: 2 }}>
          Oops! The page you are looking for doesn’t exist.
        </Typography>

        <Button
          variant='contained'
          color='primary'
          onClick={() => router.push('/')}
        >
          Go to Home
        </Button>
      </Content>
    </Wrapper>
  );
}
