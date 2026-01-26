import React from 'react';
import { Chip } from '@mui/material';

type Status = 'approved' | 'rejected' | 'pending' | 'exited';

interface StatusChipProps {
  status: Status;
  onClick?: () => void;
}

const statusConfig: Record<
  Status,
  {
    label: string;
    color: 'success' | 'error' | 'warning';
  }
> = {
  approved: {
    label: 'Approved',
    color: 'success',
  },
  rejected: {
    label: 'Rejected',
    color: 'error',
  },
  exited: {
    label: 'Exited',
    color: 'error',
  },
  pending: {
    label: 'Pending',
    color: 'warning',
  },
};

const StatusChip: React.FC<StatusChipProps> = ({ status, onClick }) => {
  const lowerStatus = status.toLowerCase() as Status;

  return (
    <Chip
      label={statusConfig?.[lowerStatus].label}
      color={statusConfig?.[lowerStatus].color}
      clickable={!!onClick}
      onClick={onClick}
      size='small'
      sx={{
        fontWeight: 500,
        textTransform: 'capitalize',
        lineHeight: '16px',
        span: { lineHeight: '16px' },
      }}
    />
  );
};

export default StatusChip;
