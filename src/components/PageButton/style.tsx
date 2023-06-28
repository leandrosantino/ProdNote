import { ToggleButton } from '@mui/material'
import styled from 'styled-components'

export const CustonToggleButton = styled(ToggleButton)`
  color: ${(p) =>
    p.theme.palette.mode === 'dark'
      ? p.theme.palette.grey[100]
      : p.theme.palette.grey[900]
  };
  font-size: 12px;
  justify-content: start;
  border-radius: 0;
  border-top: none !important;
  border: none;
  border-left-color: ${(p) =>
    p.theme.palette.primary.main
  };
  border-left-style: solid;
  border-left-width: ${(p) => p.selected ? '4px' : '0'};
`
