import { Paper, styled } from '@mui/material'

export const Container = styled(Paper)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 28px 0;

  h2{
    margin-bottom: 28px;
  }

  p{
    span{
      font-weight: bold;
    }
  }

`
