import styled from 'styled-components'

export const Aside = styled.aside`
  background-color: ${(p) =>
    p.theme.palette.mode === 'dark'
      ? p.theme.palette.grey[900]
      : p.theme.palette.grey[300]
  };
  div{
    width: 100%;
    padding: 8px;
    gap: 4px;
  }

`
