import styled from 'styled-components'
import { Paper, TextField } from '@mui/material'

export const Container = styled(Paper)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 52px;
  background-color: transparent;

  div{
    text-align: center;
  }

`

export const AuthCard = styled(Paper)`
  width: 400px;
  padding: 28px;
  border-radius: 12px;


  background-color: gray;

  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;

    button{
      margin-top: 24px;
      font-size: 12px;
      width: 80%;
    }
  }
`

export const InputText = styled(TextField)`
  width: 80%;
  margin-top: 8px;
`
