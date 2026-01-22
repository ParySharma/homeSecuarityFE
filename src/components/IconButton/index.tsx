import { Box } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';

// MUI Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const MainContainer = styled(Box)`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--primary-button-back-opacity);
  cursor: pointer;
  transition: background-color 0.3s;

  svg {
    color: #ffffff;
  }
  .delete {
    color: red;
  }

  &:hover {
    background-color: var(--primary-button-background-color);
  }
`;

// 🔁 Icon mapper
const iconMap: Record<string, React.ReactNode> = {
  edit: <EditIcon className='edit' fontSize='small' />,
  delete: <DeleteIcon className='delete' fontSize='small' />,
  visibility: <VisibilityIcon className='visibility' fontSize='small' />,
};

type Props = {
  style?: React.CSSProperties;
  icon: string;
};

const IconButton = ({ style, icon }: Props) => {
  return (
    <MainContainer
      style={{
        ...style,
        backgroundColor: icon === 'delete' ? 'rgba(255, 0, 0, 0.1)' : undefined,
      }}
    >
      {iconMap[icon] || null}
    </MainContainer>
  );
};

export default IconButton;
